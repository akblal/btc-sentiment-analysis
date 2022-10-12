import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from '../src/components/Navbar.jsx';
import Home from '../src/components/pages/Home.jsx';
import BigPicture from '../src/components/pages/BigPicture.jsx';
import CAR from '../src/components/pages/CAR.jsx';
import Ticket from '../src/components/pages/Ticket.jsx';
import Journal from '../src/components/pages/Journal.jsx';
import Resume from '../src/components/pages/Resume.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

function App (props) {

  const [headerDisplay, setHeaderDisplay] = useState(0);

  return (
    <div>
      <Navbar setHeaderDisplay= {setHeaderDisplay}/>
      <div className= 'pages'>
        <Routes>
          <Route path= '/' element= {<Home headerDisplay= {headerDisplay} setHeaderDisplay= {setHeaderDisplay}/>} />
          <Route path= '/bigpicture' element= {<BigPicture />} />
          <Route path= '/car' element= {<CAR />} />
          <Route path= '/ticket' element= {<Ticket />} />
          <Route path= '/journal' element= {<Journal />} />
          <Route path= '/resume' element= {<Resume />} />
        </Routes>
      </div>

    </div>
  )
}

root.render(<BrowserRouter>
    <App />
    </BrowserRouter>)

