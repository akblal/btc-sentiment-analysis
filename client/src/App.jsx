import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { faUniversalAccess } from '@fortawesome/free-solid-svg-icons';
import { styled } from '@mui/material/styles';
import { FormControl, InputLabel, Select, MenuItem, Box, TextField, Button, Popover, Typography, FormControlLabel, Switch } from '@mui/material';

import DropDownCrpto from './components/DropDownCrypto.jsx';
import CryptoSearch from './components/CryptoSearch.jsx';
import CoinPrice from './components/CoinPrice.jsx';
import TopCoinList from './components/TopCoinList.jsx';
import Sentiment from './components/Sentiment.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

function App (props) {

  const [theme, setTheme] = useState('dark');
  const [crypto, setCrypto] = useState('');
  const [search, setSearch] = useState('');
  const [valid, setValid] = useState(true);
  const [invalidCrypto, setInvalidCrypto] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [arrayCrypto, setArrayCrypto] = useState (['bitcoin', 'ethereum', 'cardano', 'polygon']);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const selectedCrypto = (coin) => {
    setCrypto(coin);
  }

  const toggleTheme = (e) => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  const handleSearchField = (searched) => {
    let query = (searched).toLowerCase();
    setSearch(query);
  }

  const handleSearchSubmit = (e) => {
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

  const handleClear = (e) => {
    setCrypto('');
  }

  const handleAccessibilityOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccessibilityClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme])

  return (
    <div className = {`App ${theme}`}>
      <div className= 'top-navigation-bar-container'>

          <FontAwesomeIcon onClick={handleAccessibilityOpen} icon= {faUniversalAccess} className= 'accessibility-icon'/>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleAccessibilityClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <h3>Viewing Mode: </h3>
            <span className= 'toggle-theme-container'>
              {theme === 'light' ?
                <FontAwesomeIcon icon={faMoon} onClick= {toggleTheme} className= 'toggle-theme-button' /> :
                <FontAwesomeIcon icon={faSun} onClick= {toggleTheme} className= 'toggle-theme-button' />
              }
            </span>
            <div>
              <FormControlLabel
                control={<Switch
                  sx={{ m: 1 }}
                  defaultChecked
                  onChange= {toggleTheme}/>}
                label= {theme === 'light' ? 'Light' : 'Dark'}
                value= 'start'
             />
            </div>
          </Popover>
      </div>

      <div className= 'app-title-container'>
          <h1 onClick= {() => window.location.reload(false)} className= 'app-title'>Crypto Sentiment Analysis</h1>
      </div>

      <div className= 'mui-container' >
        <div className= 'select-crypto-and-button'>
          <DropDownCrpto selectedCrypto= {selectedCrypto} theme= {theme} crypto= {crypto} arrayCrypto= {arrayCrypto} />
          <Button variant="outlined" className= 'mui-submit-button' onClick= {handleClear}>Clear</Button>
        </div>

        <div className= 'search-crypto-field-and-button'>
          <CryptoSearch handleSearchField= {handleSearchField} theme= {theme} valid= {valid} invalidCrypto= {invalidCrypto}/>
          <Button variant="outlined" className= 'mui-submit-button' onClick= {handleSearchSubmit}>Submit</Button>
        </div>
      </div>

      <div className= 'price-and-sentiment'>
        <div>
          {crypto.length > 0 &&
            <CoinPrice crypto= {crypto} />
          }
          <TopCoinList />
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