import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [search, setSearch] = useState('');
  const [valid, setValid] = useState(true);
  const [invalidCrypto, setInvalidCrypto] = useState('');

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

  const handleSearchField = (e) => {
    e.preventDefault();
    let query = (e.target.value).toLowerCase();
    setSearch(query);
  }

  const handleSearchSubmit = (e) => {
    console.log (search);
    axios.get(`https://api.coincap.io/v2/assets/${search}`)
    .then ((response) => {
      setValid(true);
      if (search.length === 0) {
        setValid(false);
      }
    })
    .catch(() => {
      setValid(false);
      setInvalidCrypto(search);
    })
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
          {valid ?
            <TextField
            required
            id="filled-required"
            label="Search for Crypto"
            className= 'mui-component'
            onChange = {handleSearchField}
            /> :
            <TextField
            error
            id="outlined-error-helper-text"
            label="Error"
            defaultValue= {invalidCrypto}
            helperText="Coin Does Not Exist."
            className= 'mui-component'
            onChange = {handleSearchField}
            />
          }

          <Button variant="outlined" className= 'mui-submit-button' onClick= {handleSearchSubmit}>Submit</Button>
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

  // <div className= 'drop-down'>
  //   <select onChange= {handleSubmit}>
  //     <option value= ''>Select Crypto</option>
  //     <option value= 'bitcoin'>Bitcoin</option>;
  //     <option value= 'ethereum'>Ethereum</option>;
  //     <option value= 'polygon'>Polygon</option>;
  //     <option value= 'cardano'>Cardano</option>;
  //   </select>
  // </div>