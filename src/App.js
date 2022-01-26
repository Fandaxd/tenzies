import './App.css';
import Die from "./components/Die"
import React, {useState, useEffect} from "react"
import Confetti from "react-confetti"
import Timer from "./components/Timer"
import BestTimes from './components/BestTimes';

function App() {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [time, setTime] = useState(0)
  const [bestTimes, setBestTimes] = useState(JSON.parse(localStorage.getItem("records")) || [])
  
  
  useEffect(() => {
    let interval = null;
    
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);
  
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  
  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };
  
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };
  
  const allNewDice = () => {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push({
        isHeld: false, 
        value: Math.ceil(Math.random() * 6), 
        key: i
      })
    }
    return newDice
  }
  
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  
  useEffect(() => {
    console.log("I just ran")
    localStorage.setItem("records", JSON.stringify(bestTimes))
  }, [tenzies])
  
  useEffect(() => {
      const onlyValues = dice.map(die => die.value)
      const onlyHelds = dice.map(die => die.isHeld)
      const allEqual = arr => arr.every(val => val === arr[0])
      
      if(allEqual(onlyValues) && allEqual(onlyHelds)){ 
          setTenzies(true)
          bestTimesSetter(time)
          sortBestTimes()
          handlePauseResume()
      }
  }, [dice, bestTimes])

  const rollDice = () => {
    handleStart()
    if(tenzies) {
      setDice(oldDice => oldDice.map(die => ({...die, isHeld: false, value: Math.ceil(Math.random() * 6)})))
      setTenzies(false)
      handleReset()
      return
    }
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
    }))
  }

  const resetGame = () => {
    setDice(oldDice => oldDice.map(die => ({...die, isHeld: false, value: Math.ceil(Math.random() * 6)})))
    setTenzies(false)
    handleReset()
  }
  
  const toggleIsHeld = (event) => {
    handleStart()
    setDice(oldDice => oldDice.map(die => Number(event.target.id-1) === die.key ? {...die, isHeld: !die.isHeld} : die)) 
  }

  const bestTimesSetter = (lastTime) => {
    setBestTimes(oldBestTimes => {
      !oldBestTimes.includes(lastTime) && oldBestTimes.push(lastTime)
      oldBestTimes.sort((a, b) => a - b)
      oldBestTimes.length > 3 && oldBestTimes.pop()      
      return oldBestTimes
    })}
  
    
  const sortBestTimes = () => {
    const bestTimesCopy = bestTimes
    return bestTimesCopy.sort((a, b) => a - b)
  }
  
  sortBestTimes()
  

  const makeDice = dice.map((die, index) => <Die value={die.value} isHeld={false} toggleIsHeld={toggleIsHeld} id={index+1} key={die.key} style={die.isHeld ? {backgroundColor: "orange"} : {backgroundColor: "white"}} />)
  


  return (
    <div className="App">
      <main className="main">
        {bestTimes.includes(time) && <Confetti />}
        <div className="header-and-guide">
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div>
          <Timer time={time} handleReset={handleReset} />
        </div>
        <div className="dice">
          {makeDice}
        </div>
        <div className="buttons">
          <button className="roll button" onClick={rollDice} >{tenzies ? "New Game" : "Roll"}</button>
          <button className="reset button" onClick={resetGame}>Reset Game</button>
        </div>
      </main>
        <BestTimes bestTimes={bestTimes} />
    </div>
  );
}

export default App;
