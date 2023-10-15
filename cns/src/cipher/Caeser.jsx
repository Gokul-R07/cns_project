import React, { useEffect, useState } from "react";

const Caeser = () => {
  const [temp, setTemp] = useState("");
  const [text, setText] = useState("");
  //for encrytion and decryption
  const [state, setState] = useState(0);

  const flag = 1;
  const encrypt = (str) => {
    var solved = "";
    const num = count % 26;
    for (var i = 0; i < str.length; i++) {
      var asciiNum = str[i].charCodeAt();
    
    if(asciiNum >= 65 && asciiNum <= 90){
        if(asciiNum + num > 90){
            solved += String.fromCharCode((asciiNum + num) % 90 + 64)
        }
        else   
            solved += String.fromCharCode(asciiNum + num)
    }
    else if(asciiNum >= 97 && asciiNum <= 122){
        if(asciiNum + num > 122){
            solved += String.fromCharCode((asciiNum + num) % 122 + 96 )
        }
        else
            solved += String.fromCharCode(asciiNum + num)
    }
    else{
        solved += str[i]
    }
      setTemp(str);
    }
    setTemp(str);
    console.log(temp)
    setText(solved);
  };

  const decrypt = (str) => {
    var solved = "";
    const num = count % 26;
    for (var i = 0; i < str.length; i++) {
        var asciiNum = str[i].charCodeAt();
        if(asciiNum >= 65 && asciiNum <= 90){
            if(asciiNum - num < 65){
                solved += String.fromCharCode(91 - (65 - (asciiNum - num)))
            }
            else   
                solved += String.fromCharCode(asciiNum + num)
        }
        else if(asciiNum >= 97 && asciiNum <= 122){
            if(asciiNum - num < 97){
                solved += String.fromCharCode(123 - (97 - (asciiNum - num)) )
            }
            else
                solved += String.fromCharCode(asciiNum - num)
        }
        else{
            solved += str[i]
        }


      setTemp(str);
    }
    setTemp(str);
    // console.log(solved);
    setText(solved);
  };

  const [count, setCount] = useState(1);

  const handleMinus = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };

  const handlePlus = () => {
    setCount(count + 1);
  };

  if(state == 0){
    useEffect(() => {
        // console.log(temp)
        encrypt(temp)
      }, [count, temp]);
    
  }
  if(state == 1){
    // setText(text)
  useEffect(() => {
    decrypt(temp);
  }, [count, temp]);
  }

  const handleEncrypt = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && inputValue !== "") {
      const newCount = parseInt(inputValue);
      setCount(newCount);
      encrypt(temp, newCount);
    } else {
      setCount(0);
      encrypt(temp, 0);
    }
  };

  const handleDecrypt = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && inputValue !== "") {
      const newCount = parseInt(inputValue);
      setCount(newCount);
      encrypt(temp, newCount);
    } else {
      setCount(0);
      encrypt(temp, 0);
    }
  };

  //   console.log(decrypt("abcd"))

  const handleEncryptClick = () => {
    setState(0)
  }

  const handleDecryptClick = () => {
    setState(1)
  }

  console.log(text)

  return (
    <div>
      <h1>Caeser cipher</h1>
      <div className="choose">
            <button onClick={handleEncryptClick}>Encrypt</button>
            <button onClick={handleDecryptClick}>Decrypt</button>
      </div>
      {state == 0 ?  
        (<div className="encrypt">
        <div>
          {count == 0 ? (
            <button disabled="true">-</button>
          ) : (
            <button onClick={handleMinus}>-</button>
          )}
          <input type="text" name="" id="" value={count} onChange={handleEncrypt}/>
          <button onClick={handlePlus}>+</button>
        </div>
        <label htmlFor="plainText">Plain Text: </label>
        <input
          type="text"
          name="plainText"
          placeholder="Enter the text"
          onChange={(e) => encrypt(e.target.value)}
        />
        <label htmlFor="cipherText">Cipher Text</label>
        <input
          type="text"
          name="cipherText"
          placeholder="Cipher Text"
          value={text}
        />
      </div>)

      : 
      (<div className="decrypt">
      <div>
        {count == 0 ? (
          <button disabled="true">-</button>
        ) : (
          <button onClick={handleMinus}>-</button>
        )}
        <input type="text" name="" id="" value={count} onChange={handleDecrypt}/>
        <button onClick={handlePlus}>+</button>
      </div>
      <label htmlFor="cipherText">Cipher Text: </label>
      <input
        type="text"
        name="cipherText"
        placeholder="Enter the cipher text"
        onChange={(e) => decrypt(e.target.value)}
      />
      <label htmlFor="plainText">Plain Text</label>
      <input
        type="text"
        name="plainText"
        placeholder="plain Text"
        value={text}
      />
    </div>
)
      }
      
        
    </div>
  );
};

export default Caeser;
