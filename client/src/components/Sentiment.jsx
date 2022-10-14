import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinBeam, faFaceMeh, faFaceAngry } from '@fortawesome/free-regular-svg-icons'

function Sentiment ({crypto}) {

  const [correlation, setCorrelation] = useState ('');
  const [reformatName, setReformatName] = useState ('');
  const [tweetList, setTweetList] = useState([]);

  let listItems = '';

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

    axios.post('/sentiment', null, {
      params: {
        crypto: crypto,
      }
    })
    .then ((response) => {
      const tweets = response.data;
      setTweetList(tweets);
    })
  }, [crypto])

  return (
    <div>
      <h2>Time to buy {reformatName}?</h2>
      <h3>Here is what Twitter has to say: </h3>
      {tweetList.map((tweet) => {
        return (
          <div className= 'tweet-container'>
            <h4>{tweet}</h4>
            <div className= 'emoji-button-container'>
              <FontAwesomeIcon icon={faFaceGrinBeam} className= "emoji"/>
              <FontAwesomeIcon icon={faFaceMeh} className= "emoji"/>
              <FontAwesomeIcon icon={faFaceAngry} className= "emoji"/>
            </div>
          </div>
        )
      })}
      <h3>FYI: {reformatName} and Twitter sentiment analysis have {correlation}.</h3>
    </div>
  )
}

export default Sentiment;

