

import React, { useState } from "react";
import Caeser from "../../cipher/Caeser";
import Vigenere from "../../cipher/Vigenere";
import Keyless from "../../cipher/Keyless";
import "./Home.css"; 

const Home = () => {
  const [state, setState] = useState(0);

  const handleCaeser = () => {
    setState(0);
  }

  const handleVigenere = () => {
    setState(1);
  }

  const handleKeyless = () => {
    setState(2);
  }

  return (
    <div className="container">
      <h1 className="heading">Cryptography</h1>
      <div className="menu">
        <button
          className={`menuButton ${state === 0 ? "active" : ""}`}
          onClick={handleCaeser}
        >
          Caeser Cipher
        </button>
        <button
          className={`menuButton ${state === 1 ? "active" : ""}`}
          onClick={handleVigenere}
        >
          Vigenere Cipher
        </button>
        <button
          className={`menuButton ${state === 2 ? "active" : ""}`}
          onClick={handleKeyless}
        >
          Keyless transposition Cipher
        </button>
      </div>
      {state === 0 ? <Caeser /> : <></>}
      {state === 1 ? <Vigenere /> : <></>}
      {state === 2 ? <Keyless /> : <></>}
    </div>
  );
};

export default Home;
