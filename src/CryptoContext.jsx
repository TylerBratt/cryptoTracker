import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";
import { CoinList } from './config/api';
import { onAuthStateChanged } from '@firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from '@firebase/firestore';

const Crypto = createContext()

export const CryptoState = () => {
  return useContext(Crypto);
};

const CryptoContext = ({children}) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("CAD");
  const [symbol, setSymbol] = useState("$");
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([])
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success"
  });

  useEffect(()=> {
    if(user) {
      const coinRef = doc(db, "watchlist", user.uid);

      const unsubscribe = onSnapshot(coinRef, coin => {
        if(coin.exists()) {
          setWatchlist(coin.data().coins)
        } else {
          console.log("No Items in Watchlist")
        }
      });
      return () => {
        unsubscribe();
      };
    }
  },[user]);

  useEffect(()=> {
    onAuthStateChanged(auth, user => {
      if(user)setUser(user);
      else setUser(null);
    })
  },[])


  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "CAD" || currency === "USD") {
      setSymbol("$")
    } else if (currency === "GBP"){
      setSymbol("£")
    } else if (currency === "JPY"){
      setSymbol("¥")
    } else if (currency === "EUR"){
      setSymbol("€")
    }
  },[currency])


  return (
    <Crypto.Provider value={{currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user, watchlist}}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

