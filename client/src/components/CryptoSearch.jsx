import React from 'react';
import { TextField } from '@mui/material';

function CryptoSearch ({ handleSearchField, theme, valid, invalidCrypto }) {

  const handleChange = (e) => {
    const searched = e.target.value;
    handleSearchField(searched);
  }

  return (
    <span>
    {valid ?
      <TextField
        id="filled-required"
        label="Search for Crypto"
        className= 'mui-component'
        onChange = {handleChange}
        inputProps = {{ style: {color: theme === 'light' ? 'black' : 'white'}}}
      /> :
      <TextField
        error
        id="outlined-error-helper-text"
        label="Error"
        defaultValue= {invalidCrypto}
        helperText="Coin Does Not Exist."
        className= 'mui-component'
        onChange = {handleChange}
        inputProps = {{ style: {color: theme === 'light' ? 'black' : 'white'}}}
      />
    }
    </span>
  )
}

export default CryptoSearch;



