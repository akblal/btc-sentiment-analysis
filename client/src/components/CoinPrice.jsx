import React, { useState, useEffect } from 'react';
import axios from 'axios';


function CoinPrice ({crypto}) {

  const [price, setPrice] = useState('');
  const [priceChangePercent, setPriceChangePercent] = useState('');

  useEffect(() => {
    cryptoInfo(crypto);
  }, [crypto])

  const cryptoInfo = (crypto) => {
    axios.get(`https://api.coincap.io/v2/assets/${crypto}`)
    .then ((response) => {
      let cryptoPrice = parseFloat(response.data.data.priceUsd);
      let priceChangePercent = parseFloat(response.data.data.changePercent24Hr);
      setPrice(Number(cryptoPrice.toFixed(10)).toLocaleString('en-US'));
      setPriceChangePercent(priceChangePercent.toFixed(5));
    })
  }

  const refreshPage = () => {
    cryptoInfo(crypto);
  }

  return (
    <div>
      <h3>{price}</h3>
      <h3 style= {{color: priceChangePercent > 0 ? 'green' : 'red'}}>{priceChangePercent}</h3>
      <button onClick = {refreshPage}>Refresh</button>
    </div>
  )
}

export default CoinPrice;

