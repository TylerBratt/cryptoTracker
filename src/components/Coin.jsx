/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom"
import { Button, LinearProgress, makeStyles, Typography } from "@material-ui/core"
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import ReactHtmlParser from "react-html-parser"
import { SingleCoin } from '../config/api';
import CoinInfo from './CoinInfo';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../firebase';

const Coin = () => {

  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios(SingleCoin(id));
    setCoin(data);
  }

  useEffect(()=> {
    fetchCoin();
  },[])

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
  }

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection:"column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Poppins"
    },
    description: {
      width: "100%",
      fontFamily: "Poppins",
      padding: 25,
      paddinTop: 0,
      paddingBottom: 15,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      }
    }
  }));

  const inWatchlist = watchlist.includes(coin?.id)

  const addToWatchlist = async() => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef,{
        coins:watchlist?[...watchlist, coin?.id]:[coin?.id]
      });
      setAlert({
        open:true, 
        message: `${coin.name} Added to Watchlist`,
        type: "success"
      });
    } catch(error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error"
      });
    }
  }

  const removeFromWatchlist = async() => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef,{
        coins: watchlist.filter((watch) => watch !== coin?.id),
      },
        { merge: true }
      );
      setAlert({
        open:true, 
        message: `${coin.name} Removed from Watchlist`,
        type: "success"
      });
    } catch(error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error"
      });
    }
  }



  const classes = useStyles();
  if (!coin) return <LinearProgress style={{backgroundColor: "gold"}}/>

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img 
          src={coin?.image.large} 
          alt={coin?.name}
          height="200"
          style={{marginBottom: 20}}
        />
        <Typography
          className={classes.heading}
          variant="h3"
        >{coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          className={classes.description}
        >
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography
              className={classes.heading}
              variant="h5">Rank:
            </Typography>
            &nbsp;
            &nbsp;
            <Typography
              variant="h5"
              style={{ fontFamily:"Poppins"}}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              className={classes.heading}
              variant="h5">Current Prince:
            </Typography>
            &nbsp;
            &nbsp;
            <Typography
              variant="h5"
              style={{ fontFamily:"Poppins"}}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              className={classes.heading}
              variant="h5">Market Cap: {" "}
            </Typography>
            &nbsp;
            &nbsp;
            <Typography
              variant="h5"
              style={{ fontFamily:"Poppins"}}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>

          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#FF0000" : "#EEBC1D"
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}

export default Coin
