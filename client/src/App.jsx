import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'

import CoinPrice from './components/CoinPrice.jsx';
import Sentiment from './components/Sentiment.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

function App (props) {

  const [theme, setTheme] = useState('light');
  const [crypto, setCrypto] = useState('');

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
      <div>
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

