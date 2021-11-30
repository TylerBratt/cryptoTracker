/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom"
import { LinearProgress, makeStyles, Typography } from "@material-ui/core"
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import ReactHtmlParser from "react-html-parser"
import { SingleCoin } from '../config/api';
import CoinInfo from './CoinInfo';

const Coin = () => {

  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

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
        justifyContent: "space-around",
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
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}

export default Coin
