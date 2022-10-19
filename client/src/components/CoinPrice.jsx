import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong, faArrowDownLong } from '@fortawesome/free-solid-svg-icons';

function CoinPrice ({crypto}) {

  const [price, setPrice] = useState('');
  const [priceChangePercent, setPriceChangePercent] = useState('');
  const [coinLogo, setCoinLogo] = useState('');

  const bitcoinLogo = 'https://seeklogo.com/images/B/bitcoin-logo-594596D72F-seeklogo.com.png?v=637945357710000000';
  const ethereumLogo = 'https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png';
  const polygonLogo = 'https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png';
  const cardanoLogo = 'https://seeklogo.com/images/C/cardano-ada-logo-4B6BADDB43-seeklogo.com.png';

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
    .then(() => {
      if (crypto === 'bitcoin') {
        setCoinLogo(bitcoinLogo);
      } else if (crypto === 'ethereum') {
        setCoinLogo(ethereumLogo);
      } else if (crypto === 'polygon') {
        setCoinLogo(polygonLogo);
      } else if (crypto === 'cardano') {
        setCoinLogo(cardanoLogo);
      }
    })
  }

  const refreshComponent = () => {
    cryptoInfo(crypto);
  }

  return (
    <div>
      {crypto.length > 0 &&
        <div className= 'price-container'>
          <div className= 'coin-logo-container'>
            <img className= 'coin-logo' src= {coinLogo} alt= 'coin logo' onClick= {refreshComponent}/>
          </div>
          <div className= 'coin-info'>
            <div>{price}</div>
            {Number(price) >= 0 ?
              <FontAwesomeIcon icon={faArrowDownLong} /> :
              <FontAwesomeIcon icon={faArrowDownLong} />
            }
            <span style= {{color: priceChangePercent > 0 ? 'green' : 'red'}}>{priceChangePercent}%</span>
          </div>
        </div>
      }

    </div>

  )
}

export default CoinPrice;