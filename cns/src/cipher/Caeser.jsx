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
        encrypt(temp)
      }, [count, temp]);
    
  }
  if(state == 1){
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



  useEffect(() => {
    setText('')
    setTemp('')
  },[state])

  const handleEncryptClick = () => {
    setState(0)
  }

  const handleDecryptClick = () => {
    setState(1)
  }



  return (
    <div className="caeser">
      <h1 className="heading">Caeser cipher</h1>
      <div className="card">
      <div className="caeserChoose">
            <button  className={`caeserButton ${state === 0 ? "active" : ""}`} onClick={handleEncryptClick}>Encrypt</button>
            <button className={`caeserButton ${state === 1 ? "active" : ""}`} onClick={handleDecryptClick}>Decrypt</button>
      </div>
      {state == 0 ?  
        (<div className="caeserEncrypt">
          <p className="shiftText">SHIFT</p>
        <div className="caeserShift">
          {count == 0 ? (
            <button className="shiftButton" disabled="true">-</button>
          ) : (
            <button className="shiftButton" onClick={handleMinus}>-</button>
          )}
          <input type="text" name="shift" id="" value={count} onChange={handleEncrypt}/>
          <button className="shiftButton" onClick={handlePlus}>+</button>
        </div>
       <div className="caeserInput">
        <div className="caeserLeft">
        <label htmlFor="plainText">Plain Text: </label>
       <textarea
       value={temp}
       className="input"
          type="text"
          name="plainText"
          placeholder="Enter the text"
          onChange={(e) => encrypt(e.target.value)}
        />
        </div>
        <div className="caeserLeft"> 
        <label htmlFor="cipherText">Cipher Text</label>
        <textarea
        className="input"
          type="text"
          name="cipherText"
          placeholder="Cipher Text"
          value={text}
        />
        </div>
       </div>
      </div>)

      : 
      (<div className="caeserDecrypt">
        <p className="shiftText">SHIFT</p>
      <div className="caeserShift">
        {count == 0 ? (
          <button className="shiftButton"  disabled="true">-</button>
        ) : (
          <button className="shiftButton" onClick={handleMinus}>-</button>
        )}
        <input type="text" name="" id="" value={count} onChange={handleDecrypt}/>
        <button className="shiftButton" onClick={handlePlus}>+</button>
      </div>
      <div className="caeserInput">

      <div className="caeserLeft">
      <label htmlFor="cipherText">Cipher Text: </label>
      <textarea
      value={temp}
      className="input"
        type="text"
        name="cipherText"
        placeholder="Enter the cipher text"
        onChange={(e) => decrypt(e.target.value)}
      />
      </div>
      <div className="caeserLeft">

      <label htmlFor="plainText">Plain Text</label>
      <textarea
      className="input"
        type="text"
        name="plainText"
        placeholder="plain Text"
        value={text}
      />
      </div>
      </div>
    </div>
)
      }
      </div>
      
        
    </div>
  );
};

export default Caeser;
