import '../App.css';
import IMG from '../img/CarGif.gif';

import React from 'react';

const Preload = () => {
  return (
    <div className="loading-container">
        <img src={IMG} alt='' width="110px"/>
    </div>
  );
};

export default Preload ;