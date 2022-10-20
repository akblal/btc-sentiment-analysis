import React, { useState } from 'react';

import { FormControl, InputLabel, Select, MenuItem, Box, TextField, Button, Popover, Typography, FormControlLabel, Switch } from '@mui/material';


function DropDownCrpto ({selectedCrypto, theme, crypto, arrayCrypto}) {

  const handleSubmit = (e) => {
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

        {
          arrayCrypto.map((coin) => {
            return (
              <MenuItem
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

// <MenuItem
//             value={'bitcoin'}
//             style = {{
//               color: theme === 'light' ? 'black' : 'white',
//               backgroundColor: theme === 'light' ? 'white' : '#414545',
//             }}
//             >Bitcoin</MenuItem>
//           <MenuItem
//             value={'ethereum'}
//             style = {{
//               color: theme === 'light' ? 'black' : 'white',
//               backgroundColor: theme === 'light' ? 'white' : '#414545',
//             }}
//             >Ethereum</MenuItem>
//           <MenuItem
//             value={'cardano'}
//             style = {{
//               color: theme === 'light' ? 'black' : 'white',
//               backgroundColor: theme === 'light' ? 'white' : '#414545',
//             }}
//             >Cardano</MenuItem>
//           <MenuItem
//             value={'polygon'}
//             style = {{
//               color: theme === 'light' ? 'black' : 'white',
//               backgroundColor: theme === 'light' ? 'white' : '#414545',
//             }}
//             >Polygon</MenuItem>