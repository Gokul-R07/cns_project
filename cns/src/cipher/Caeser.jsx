import React, { useEffect, useState } from 'react'

const Caeser = () => {
    const [temp,setTemp] = useState("")
    const [text , setText] = useState("");
    const flag = 1
    const change = (str) => {
        var solved ="";
        const num = count % 26;
        for(var i = 0;i<str.length;i++){
            var asciiNum = str[i].charCodeAt();
            if(asciiNum >= 65 && asciiNum <= 77){
                solved += String.fromCharCode(asciiNum + num);
            }
            else if(asciiNum >= 78 && asciiNum <= 90){
                solved += String.fromCharCode(asciiNum - num);
            }
            else if(asciiNum >= 97 && asciiNum <= 109){
                solved += String.fromCharCode(asciiNum + num);
            }
            else if(asciiNum >= 109 && asciiNum <= 122){
                solved += String.fromCharCode(asciiNum - num);
            }
            else {
                solved += str[i];
            }
            setTemp(str)
        }
        setTemp(str)
        console.log(temp)
        setText(solved)
    }

   

    const [count,setCount] = useState(1)

    const handleMinus = () => {
        if(count > 0){
            setCount(count - 1)
        }
        else{
            setCount(0)
        }
        // change(temp)
    }

    const handlePlus = () => {
        setCount(count + 1)
        // change(temp)
    }

    useEffect(() => {
        // console.log(temp)
        change(temp)
    },[count,temp])


    const handleChange = (e) => {
        const inputValue = e.target.value;
        if (!isNaN(inputValue) && inputValue !== '') {
          const newCount = parseInt(inputValue);
          setCount(newCount);
          change(temp, newCount);
        } else {
          setCount(0);
          change(temp, 0);
        }
      }
      

  return (
    <div>
        <h1>Caeser cipher</h1>
        <div>
            { count == 0 ? <button disabled="true">-</button> : 
            <button onClick={handleMinus} >-</button>
            }
            <input type="text" name="" id="" value={count} onChange={handleChange}/>
            <button onClick={handlePlus}  >+</button>
        </div>
        <label htmlFor="plainText">Plain Text: </label>
    <input type="text" name="plainText" placeholder="Enter the text" onChange={(e) => change(e.target.value)}/>
    <label htmlFor="cipherText">Cipher Text</label>
    <input type="text" name='cipherText' placeholder='Cipher Text' value={text} />
    </div>
  )
}

export default Caeser