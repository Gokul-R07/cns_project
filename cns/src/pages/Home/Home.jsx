import React from "react";
import Caeser from "../../cipher/Caeser";
import Vigenere from "../../cipher/Vigenere";

const Home = () => {
  return (
    <div>
      <Caeser />
      <br /><br />
      <Vigenere />
    </div>
  );
};

export default Home;
