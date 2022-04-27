import React from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json";






export default function App() {
   const [currentAccount, setCurrentAccount] = React.useState("");
  const [allWaves, setAllWaves] = React.useState([]);
    const [load, setLoad] = React.useState(0);
    const [waveText, setWaveText] = React.useState("");
  const [def, setDef] = React.useState("Every question describes a word, tell us what you think it describes and win Crypto!🤑");
  const [allMemes, setAllMemes] = React.useState("");
  const [text, setText] = React.useState("gold");
  const [count, setCount] = React.useState(0);
    const [error, setError] = React.useState(false);
  const [answer, setAnswer] = React.useState(false);

    const contractAddress = "0x1255Bc9478B9F6dd1fD732951664B7aea66FAf9C";

   /**
   * Create a variable here that references the abi content!
   */
  const contractABI = abi.abi;

  let start;


   //React.useEffect(() => {
     //   fetch("https://random-word-api.herokuapp.com/word?number=1")
      //      .then(res => res.json())
        //    .then(data => setText(data))
            
        //fetch(title)
            //.then(res => res.json())
            //.then(data => setAllMemes(data))
   // }, [count])
    //console.log(text)
    
    React.useEffect(() => {
        //const ail = text[0].word
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
            .then(res => res.json())
            .then(data => setAllMemes(data))
    }, [text])
    
    
    //function getImage() {
        //setText()
        //const memesArray = text
        //const randomNumber = Math.floor(Math.random() * memesArray.length)
        //const tit = memesArray[randomNumber]
        //setWord(tit);
        //}
    
    //console.log(allMemes)
    
    

    //doSomething()   // <---- measured code goes between startTime and endTime
    //var startTime = performance.now()

    const getMemeImage = async() => { 
      //setAnswer(false);
      try { 
        if (currentAccount) {
           setError(false);
        
        const memesArr = allMemes
        //const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArr[0].meanings[0].definitions[0].definition;
       const updateDef = await setDef(url);
       
          
          } else {
            console.log("No wallet connected");
      }
        } catch(error) {
            clearTimeout(start);
            setAnswer(false);
            setError(true);
        } 
      
        
    } 
    
    //var endTime = performance.now()

    //console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
  const showAnswer = () => {
    if (!error){setAnswer(true);
               }
    else {
      console.log("error")
    }
      
  }
    
    const repCount = async() => {
      try { if (currentAccount) {
        setWaveText("");
        const changeAnswer = await setAnswer(false);
      const clearStart = await clearTimeout(start);
      setCount((c) => c + 1);
      } 
      else {
            console.log("No wallet connected");
      };
      } catch(error) {
            clearTimeout(start);
            clearTimeout(reward);
            setAnswer(false);
            
            //console.log(error)
            setError(true);
            //clearTimeout(start);
        }
    }
    

   /*
   * Create a method that gets all waves from your contract
   */


/**
 * Listen in for emitter events!
 */
  

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        
        setCurrentAccount(account);
        
        
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      setLoad(50);

      if (!ethereum) {
        alert("Get MetaMask!");
        setLoad(25);
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      
    } catch (error) {
      console.log(error);
      setLoad(25);
    }
  }

  React.useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const wave = async () => {
    setAnswer(true);
   if (waveText === text) {
     try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

   
   let countNum = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", countNum.toNumber());
        

        /*
        * Execute the actual wave from your smart contract
        */
        
  const waveTxn = await wavePortalContract.wave();
        
        console.log("Mining...", waveTxn.hash);
        

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        

        countNum = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", countNum.toNumber());
        
      } 
      else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
}
    else {
        console.log("Wrong Anwser!");
      }
  }
  function handleChange(event) {
        const {value} = event.target;
        setWaveText(value);
    }
  
  return (
    <div className="mainContainer">
      
      <div className="dataContainer">
        <div className="header"><h2>
        Word Trivia </h2>
        </div>

       

          {/*
        * If there is no currentAccount render this button <input 
                    type="text"
                    placeholder="Tell me something..."
                    className="form--input"
                    value={waveText} 
                    onChange={handleChange} />
        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button> 
        */}
       
        
        

     <div className="dblue">
      <section className="projects">
      
      <article>
         
       <div className="buttons"> <button className="playButton" onClick={getMemeImage}>
            Question
          </button>
           <button className="playButton" onClick={wave}>
            Answer
          </button></div>
        <div className="blackbox">
           
           {error && <p className="textbox"     onCopy={(e)=>{
      e.preventDefault()
      return false;
    }}>Oops! Click Play Again</p>}
           {!error && (<p className="textbox"     onCopy={(e)=>{
      e.preventDefault()
      return false;
    }}>{def}</p>)}</div>
        
        <div className="text">
      
          <div className="input--box">
            {currentAccount && (<div>
      {!answer && (
      <div className="answer--box">
      <input 
          type="text"
        onPaste={(e)=>{
      e.preventDefault()
      return false;
    }} onCopy={(e)=>{
      e.preventDefault()
      return false;
    }}
                    placeholder="Type anwser..."
                    className="answer--input"
                    value={waveText} 
                    onChange={handleChange} />
      </div>
        )}
              {!(waveText === text) && (<div>
      {answer && (<div className="answer--output"><p className="answerText">{text}</p></div>)}
              </div>)}{(waveText === text) && (<div>
      {answer && (<div className="answer--output"><p className="answerText">YOU WON!</p></div>)}
              </div>)}
              </div>)
              
              } 
           
                                {!currentAccount && (
          <div className="waveButton" onClick={connectWallet}> { (load === 25) && (<p>RETRY</p>)} { 
             (load === 50) && (<div class="loader">
  <span class="loader__element"></span>
  <span class="loader__element"></span>
  <span class="loader__element"></span>
</div>)}{(load === 0) && (<p>
            CONNECT WALLET TO PLAY</p>)}
          </div>
        )}
      </div>
      
      <div className="hint"><h4>Hint: <em>If it starts with "to" it might be a verb</em></h4></div>
      </div>
     
    </article>  
    </section>
      </div>
    
      </div>
    </div>
  );
    
}
