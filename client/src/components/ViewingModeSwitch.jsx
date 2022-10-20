import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

function ViewingModeSwitch ({ theme, toggleTheme }) {

  const switchTheme = () => {
    toggleTheme();
  }

  return (
    <div>
      <FormControlLabel
        control= {<Switch
          sx={{ m: 1 }}
          defaultChecked
          onChange= {switchTheme}
        />}
        label= {theme === 'light' ? 'Light' : 'Dark'}
        value= 'start'
      />
    </div>
  )
}

export default ViewingModeSwitch;
