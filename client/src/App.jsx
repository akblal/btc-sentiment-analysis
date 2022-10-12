import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CoinPrice from './components/CoinPrice.jsx'


const container = document.getElementById('root');
const root = createRoot(container);

function App (props) {

  const [crypto, setCrypto] = useState('');

  return (
    <div className = 'app'>
      <div className= 'web-title'>
          <h1> Crypto Sentiment Analysis </h1>
      </div>

      <div className= 'drop-down'>
        <select onChange= {(e) => {
          const selected = e.target.value;
          setCrypto(selected);
        }}>
          <option value= ''>Select Crypto</option>
          <option value= 'Bitcoin'>Bitcoin</option>;
          <option value= 'Ethereum'>Ethereum</option>;
          <option value= 'Polygon'>Polygon</option>;
          <option value= 'Cardano'>Cardano</option>;
        </select>
      </div>

      <CoinPrice crypto = {crypto}/>
    </div>



  )
}

root.render(<BrowserRouter>
    <App />
    </BrowserRouter>)

