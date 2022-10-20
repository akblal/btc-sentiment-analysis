import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';


function TopCoinList ({ theme }) {

  const [number, setNumber] = useState(5);
  const [coinList, setCoinList] = useState([]);
  const [numberCoins, setNumberCoins] = useState([5, 10, 20, 50])

  useEffect(() => {
    getList(number);
  }, [])

  const getList = (number) => {
    axios.get(`https://api.coincap.io/v2/assets?limit=${number}`)
    .then((response) => {
      console.log (response.data.data);
      setCoinList(response.data.data);
    })
  }

  const handleTopNumber = (e) => {
    let topNumber = e.target.value;
    setNumber(topNumber);
    getList(topNumber);
  }

  return (
    <div>
      <div>
        <span>Top</span>
        <span>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Want More Top Coins?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={number}
              onChange={handleTopNumber}
              style = {{
                color: theme === 'light' ? 'black' : 'white',
              }}
            >
            {numberCoins.map((num) => {
              return (
                <MenuItem
                  value={num}
                  style = {{
                    color: theme === 'light' ? 'black' : 'white',
                    backgroundColor: theme === 'light' ? 'white' : '#414545',
                  }}
                >
                  {num}
                </MenuItem>
              )})
            }
            </Select>
          </FormControl>
        </span>
        <span> Crypto!</span>
      </div>


      {coinList.map((coin) => {
        return (
          <div className= 'top-coin-container'>
            <h4>{coin.rank}. {coin.symbol}</h4>
            <h3>{parseFloat(coin.priceUsd).toFixed(2).toLocaleString('en-US')}</h3>
            <h3>{parseFloat(coin.changePercent24Hr).toFixed(2)}</h3>
          </div>
        )
      })}
    </div>
  )
}

export default TopCoinList;

