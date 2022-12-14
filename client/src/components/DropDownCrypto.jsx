import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function DropDownCrpto ({selectedCrypto, theme, crypto, arrayCrypto}) {

  const handleSubmit = (e) => {
    e.preventDefault();
    const selected = e.target.value;
    selectedCrypto(selected);
    console.log (arrayCrypto)
  }

  return (
    <span>
      <FormControl className= 'mui-component'>
        <InputLabel id="demo-simple-select-label">Crypto</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={crypto}
          onChange={handleSubmit}
          style = {{
            color: theme === 'light' ? 'black' : 'white',
          }}
        >
        {arrayCrypto.map((coin) => {
          return (
            <MenuItem
              key= {coin}
              value={coin}
              style = {{
                color: theme === 'light' ? 'black' : 'white',
                backgroundColor: theme === 'light' ? 'white' : '#414545',
              }}
            >
              {coin.substring(0,1).toUpperCase() + coin.substring(1)}
            </MenuItem>
          )})
        }
        </Select>
      </FormControl>
    </span>
  )
}

export default DropDownCrpto;
