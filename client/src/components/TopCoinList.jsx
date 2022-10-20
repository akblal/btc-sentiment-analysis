import React, { useState, useEffect } from 'react';
import axios from 'axios';


function TopCoinList () {

  const [number, setNumber] = useState(5);
  const [coinList, setCoinList] = useState([]);

  useEffect(() => {
    axios.get(`https://api.coincap.io/v2/assets?limit=${number}`)
    .then((response) => {
      console.log (response.data.data);
      setCoinList(response.data.data);
    })
  }, [])

  return (
    <div>
      <h1>Top {number} Crypto</h1>
      {coinList.map((coin) => {
        return (
          <div className= 'top-coin-container'>
            <h4>{coin.rank}. {coin.id} {coin.symbol}</h4>
            <h3>{parseFloat(coin.priceUsd).toFixed(2).toLocaleString('en-US')}</h3>
            <h3>{parseFloat(coin.changePercent24Hr).toFixed(2)}</h3>
          </div>
        )
      })}
    </div>
  )
}

export default TopCoinList;

