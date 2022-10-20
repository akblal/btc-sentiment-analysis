import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { Popover } from '@mui/material';

import ViewingModeSwitch from './ViewingModeSwitch.jsx';

function AccessibilityPopOver ({ anchorEl, handleAccessibilityClose, theme, toggleTheme }) {

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClose = () => {
    handleAccessibilityClose();
  }

  const switchTheme = () => {
    toggleTheme();
  }
  return (
    <span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <h3>Viewing Mode: </h3>
        <ViewingModeSwitch theme= {theme} toggleTheme= {toggleTheme} />
      </Popover>
    </span>
  )
}

export default AccessibilityPopOver;

// <span className= 'toggle-theme-container'>
//           {theme === 'light' ?
//             <FontAwesomeIcon icon={faMoon} onClick= {switchTheme} className= 'toggle-theme-button' /> :
//             <FontAwesomeIcon icon={faSun} onClick= {switchTheme} className= 'toggle-theme-button' />
//           }
//         </span>



