import React, { useEffect, useState } from 'react'

const Keyless = () => {

    const [text, setText] = useState("")
    const [col, setCol] = useState(1)
    const [res, setRes] = useState("")
    const [option, setOption] = useState(0)
    

   
    function keylessTranspositionEncrypt(text, numCols) {
        setText(text)
        numCols = parseInt(numCols);
        if (!Number.isInteger(numCols) || numCols <= 0) {
            return ""; // Return an empty string or handle the validation error
        }
        // Remove spaces and convert the text to uppercase
        text = text.replace(/\s/g, '');
      
        // Calculate the number of rows needed
        const numRows = Math.ceil(text.length / numCols);
      
        // Create an array of empty arrays to represent the grid
        const grid = new Array(numRows);
        for (let i = 0; i < numRows; i++) {
          grid[i] = new Array(numCols);
        }
      
        // Fill the grid with the characters from the text row by row
        let index = 0;
        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numCols; col++) {
            if (index < text.length) {
              grid[row][col] = text[index];
              index++;
            } else {
              grid[row][col] = ' '; // Fill with 'X' for empty cells
            }
          }
        }
      
        // Create the encrypted text by reading the grid column by column
        let encryptedText = '';
        for (let col = 0; col < numCols; col++) {
          for (let row = 0; row < numRows; row++) {
            encryptedText += grid[row][col];
          }
        }
        return encryptedText;
      }


   
      
      function keylessTranspositionDecrypt(encryptedText, numCols) {
        setText(encryptedText)
        numCols = parseInt(numCols);
        // Calculate the number of rows needed
        if (!Number.isInteger(numCols) || numCols <= 0) {
            return ""; // Return an empty string or handle the validation error
        }
        const numRows = Math.ceil(encryptedText.length / numCols);
        // Create an array of empty arrays to represent the grid
        const grid = new Array(numRows);
        for (let i = 0; i < numRows; i++) {
          grid[i] = new Array(numCols);
        }
      
        // Fill the grid with the characters from the encrypted text column by column
        let index = 0;
        for (let col = 0; col < numCols; col++) {
          for (let row = 0; row < numRows; row++) {
            grid[row][col] = encryptedText[index];
            index++;
          }
        }
      
        // Create the decrypted text by reading the grid row by row
        let decryptedText = '';
        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numCols; col++) {
            if (grid[row][col] !== 'X') {
              decryptedText += grid[row][col];
            }
          }
        }
  
        return decryptedText;
      }

      useEffect(() => {
        if (option === 0) {
          if (col <= text.length) {
            const encryptedText = keylessTranspositionEncrypt(text, col);
            setRes(encryptedText);
          } else {
            setRes('');
          }
        } else if (option === 1) {
          if (text && col <= text.length) {
            const decryptedText = keylessTranspositionDecrypt(text, col);
            setRes(decryptedText);
          } else {
            setRes('');
          }
        }
      }, [text, col, option]);
      
      useEffect(() => {
        setText('')
        setRes("")
      },[option])

    
    console.log(res)
  return (
    <div className='keyless'>
        <h1 className='heading'>Keyless transposition cipher</h1>
         <div className="card">
         <div className="caeserChoose">
            <button className={`caeserButton ${option === 0 ? "active" : ""}`} onClick={() =>setOption(0)}>Encrypt</button>
            <button className={`caeserButton ${option === 1 ? "active" : ""}`} onClick={() => setOption(1)}>Decrypt</button>
      </div>
      <div className="vigenereKey">
            <label htmlFor="numCols">Number of Columns: </label>

            <input type="number" min={1} name='numCols'  placeholder='Enter no of columns' onChange={(e) => setCol(e.target.value)}/>
      </div>
        <div className='caeserInput'>
            
            {option == 0 && res? (
                <div className='keylessEncrypt'>
                <div className='caeserLeft'>
                <label htmlFor="keylessCipherInput" >Plain Text</label>
                <textarea className='input' type="text" value={text} name='keylessCipherInput'  placeholder='Enter plain text' onChange={(e) => keylessTranspositionEncrypt(e.target.value, col)}/>

                </div>
                <div className='caeserLeft'>
                <label htmlFor="keylessCipherOutput">Cipher Text</label>
                <textarea className='input' type="text" name='keylessCipherOutput' placeholder='Cipher Text' value={res}/>

                </div>
    
                </div>
    
            ):
            
            (
                <div className='keylessDecrypt'>
                    <div className='caeserLeft'>
                    <label htmlFor="keylessCipherInput" >Cipher Text</label>
            <textarea className='input' type="text" value={text} name='keylessCipherInput'   placeholder='Enter cipher text' onChange={(e) => keylessTranspositionDecrypt(e.target.value, col)}/>

                    </div>

                <div className='caeserLeft'>
            <label htmlFor="keylessCipherOutput">Plain Text</label>
            <textarea className='input' type="text" name='keylessCipherOutput' placeholder='Plain Text' value={res}/>

                </div>

            </div>
            )}
            
        </div>
         </div>
    </div>
  )
}

export default Keyless