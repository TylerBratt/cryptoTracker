import React, { createContext, useContext, useState, useEffect } from 'react'

const Crypto = createContext()

export const CryptoState = () => {
  return useContext(Crypto);
};

const CryptoContext = ({children}) => {

  const [currency, setCurrency] = useState("CAD");
  const [symbol, setSymbol] = useState("$");

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
    <Crypto.Provider value={{currency, symbol, setCurrency}}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

