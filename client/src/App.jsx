import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { FormControl, InputLabel, Select, MenuItem, Box, TextField, Button } from '@mui/material';

import CoinPrice from './components/CoinPrice.jsx';
import Sentiment from './components/Sentiment.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

function App (props) {

  const [theme, setTheme] = useState('light');
  const [crypto, setCrypto] = useState('');
  const [age, setAge] = useState(0);

  const handleSubmit = (e) => {
    const selected = e.target.value;
    setCrypto(selected);
  }

  const toggleTheme = (e) => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme])

  return (
    <div className = {`App ${theme}`}>
      <div className= 'toggle-theme-container'>
        {theme === 'light' ?
          <FontAwesomeIcon icon={faMoon} onClick= {toggleTheme} className= 'toggle-theme-button' /> :
          <FontAwesomeIcon icon={faSun} onClick= {toggleTheme} className= 'toggle-theme-button' />
        }
      </div>

      <div className= 'web-title'>
          <h1> Crypto Sentiment Analysis </h1>
      </div>

      <div className= 'drop-down'>
        <select onChange= {handleSubmit}>
          <option value= ''>Select Crypto</option>
          <option value= 'bitcoin'>Bitcoin</option>;
          <option value= 'ethereum'>Ethereum</option>;
          <option value= 'polygon'>Polygon</option>;
          <option value= 'cardano'>Cardano</option>;
        </select>
      </div>

      <div className= 'mui-container' >
        <FormControl className= 'mui-component'>
          <InputLabel id="demo-simple-select-label">Crypto</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={crypto}
            label="Age"
            onChange={handleSubmit}
          >
            <MenuItem value={'bitcoin'}>Bitcoin</MenuItem>
            <MenuItem value={'ethereum'}>Ethereum</MenuItem>
            <MenuItem value={'cardano'}>Cardano</MenuItem>
            <MenuItem value={'polygon'}>Polygon</MenuItem>
          </Select>
        </FormControl>
        <div className= 'search-crypto-field-and-button'>
          <TextField
          required
          id="filled-required"
          label="Search for Crypto"
          defaultValue="Coin"
          className= 'mui-component'
          />
          <Button variant="outlined" className= 'mui-submit-button'>Submit</Button>
        </div>
      </div>

      <div className= 'price-and-sentiment'>
        <div>
          {crypto.length > 0 &&
            <CoinPrice crypto= {crypto}/>
          }
        </div>
        <div className= 'sentiment-container'>
          {crypto.length > 0 &&
            <Sentiment crypto = {crypto}/>
          }
        </div>
      </div>
    </div>
  )
}

root.render(<BrowserRouter>
    <App />
    </BrowserRouter>)

