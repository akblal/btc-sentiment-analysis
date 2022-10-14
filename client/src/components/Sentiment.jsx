import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Sentiment ({crypto}) {

  const [correlation, setCorrelation] = useState ('');
  const [reformatName, setReformatName] = useState ('');

  useEffect (() => {
    if (crypto === 'bitcoin') {
      setCorrelation('62.48% correlation');
    } else if (crypto === 'ethereum') {
      setCorrelation('no correlation (study showed no correlation)');
    } else if (crypto === 'cardano') {
      setCorrelation('no correlation (no studies performed)');
    } else if (crypto === 'polygon') {
      setCorrelation('no correlation (no studies performed)');
    }

    setReformatName(crypto.substring(0,1).toUpperCase() + crypto.substring(1));
  }, [crypto])

  return (
    <span>
      <h3>Time to buy {reformatName}?</h3>
      <h4>Here is what Twitter has to say: </h4>
      <p>FYI: {reformatName} and Twitter sentiment analysis have {correlation}.</p>
    </span>
  )
}

export default Sentiment;

