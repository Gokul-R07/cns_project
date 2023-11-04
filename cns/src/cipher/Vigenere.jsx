
import React, { useEffect, useState } from "react";

const Vigenere = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [origText, setOrigText] = useState("");

  const [state, setState] = useState(0);

  // This map declaration should run only once
  const indexAlphabetMap = new Map();
  const alphabetIndexMap = new Map();
  let alphabetCode = "a".charCodeAt();

  for (let i = 0; i < 26; i++, alphabetCode++) {
    indexAlphabetMap.set(i, String.fromCharCode(alphabetCode));
    alphabetIndexMap.set(String.fromCharCode(alphabetCode), i);
  }

  let getAlphabet = (index) => {
    return indexAlphabetMap.get(index);
  };

  let getIndex = (alphabet) => {
    return alphabetIndexMap.get(alphabet);
  };

  let calculateModulus26 = (a, b) => {
    return (a + b) % 26;
  };

  let incrementKeyIndex = (currentKeyLength, keyText) => {
    if (currentKeyLength === keyText.length - 1) return 0;
    return currentKeyLength + 1;
  };

  let getEncryptedLetter = (Letter, Key) => {
    if (Letter === " ") {
      return " ";
    }
    let LetterIndex = getIndex(Letter);
    let KeyIndex = getIndex(Key);
    let EncryptedLetterIndex = calculateModulus26(LetterIndex, KeyIndex);
    let EncryptedLetter = getAlphabet(EncryptedLetterIndex);
    return EncryptedLetter;
  };

  let getDecryptedLetter = (Letter, Key) => {
    if (Letter === " ") {
      return " ";
    }
    let LetterIndex = getIndex(Letter);
    let KeyIndex = getIndex(Key);
    let DecryptedLetterIndex = (LetterIndex - KeyIndex + 26) % 26;
    let DecryptedLetter = getAlphabet(DecryptedLetterIndex);
    return DecryptedLetter;
  };

  const vigenereCipher = (inputText, keyText, encrypt = true) => {
    let resultText = "";
    let currentKeyLength = 0;

    for (let i = 0; i < inputText.length; i++) {
      let currentLetter = inputText.charAt(i);
      let currentKey = keyText.charAt(currentKeyLength);

      if (currentLetter === " ") {
        // Don't increment the key index for spaces
        resultText += " ";
      } else {
        if (encrypt) {
          resultText += getEncryptedLetter(currentLetter, currentKey);
        } else {
          resultText += getDecryptedLetter(currentLetter, currentKey);
        }
        currentKeyLength = incrementKeyIndex(currentKeyLength, keyText);
      }
    }

    return resultText;
  };

  useEffect(() => {
    if (key.length > 2 && origText) {
      const encryptedText = vigenereCipher(origText, key, true);
      setText(encryptedText);
    } else {
      setText("");
    }
  }, [key, origText]);

  useEffect(() => {
    if (key.length > 2 && text) {
      const decryptedText = vigenereCipher(text, key, false);
      setOrigText(decryptedText); // Update the state with the decrypted text
    } else {
      setOrigText(""); // Handle the case when the key or text is undefined
    }
  }, [key, text]);

  const handleEnrypt = () => {
    setState(0);
  };

  const handleDecrypt = () => {
    setState(1);
  };

  return (
    <div className="vigenere">
      <h1 className="heading">Vigenere</h1>
      <div className="card">
      <div className="caeserChoose">
        <button className={`caeserButton ${state === 0 ? "active" : ""}`} onClick={handleEnrypt}>Encrypt</button>
        <button className={`caeserButton ${state === 1 ? "active" : ""}`} onClick={handleDecrypt}>Decrypt</button>
      </div>
      {/* <br /> */}
     <div className="vigenereKey">
     <label htmlFor="key">Enter key: </label>
      <input
        type="text"
        placeholder="Enter key"
        onChange={(e) => setKey(e.target.value)}
      />
     </div>
      {state == 0 ? (
        <div className="caeserInput">
          <div className="caeserLeft">
          <label htmlFor="plainText">Plain Text: </label>

          <textarea
            className="input"
            type="text"
            name="plainText"
            placeholder="Enter the text"
            onChange={(e) => setOrigText(e.target.value)}
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
      ) : (
        <div className="caeserInput">
         <div className="caeserLeft">
         <label htmlFor="cipherText">Cipher Text: </label>
          <textarea
          className="input"
            type="text"
            name="cipherText"
            placeholder="Enter the cipher text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setOrigText(vigenereCipher(e.target.value, key, false));
            }}
          />
         </div>
         <div className="caeserLeft">
         <label htmlFor="plainText">Plain Text</label>
          <textarea
          className="input"
            type="text"
            name="plainText"
            placeholder="plain Text"
            value={origText}
          />
         </div>
        </div>
      )}
      </div>
      
    </div>
  );
};

export default Vigenere;
