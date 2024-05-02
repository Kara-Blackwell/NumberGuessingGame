import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Routes, Route, Link} from 'react-router-dom';
import './App.css';

function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>

  )
}

function Nav () {
  return (
    <ul id='main-nav'>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/settings">Settings</Link></li>
      <li><Link to="/stats">Stats</Link></li>
    </ul>
  );
}

const Game = ({ maxNumber, maxGuesses }) => {
  const [number, setNumber] = useState(Math.floor(Math.random() * maxNumber) + 1);
  const [guess, setGuess] = useState('');
  const [remainingGuesses, setRemainingGuesses] = useState(maxGuesses);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setGuess(parseInt(e.target.value));
  };

  const remainingGuessesText = () => {
    if (remainingGuesses === 1) {
      return '1 guess remaining';
    } else {
      return `${remainingGuesses} guesses remaining`;
    }
  };

  const handleGuess = () => {
    if (isNaN(guess) || guess <1 || guess > 100) {
      setMessage('Please enter a number between 1 and 100');
      return;
    }

    if (guess === number) {
      setMessage('Guessed correctly!');
      setGameOver(true);

    } else if (remainingGuesses === 1) {
      setMessage(`Out of guesses! The correct number was ${number}`);
      setGameOver(true);

    } else if (guess < number) {
      setMessage('Guessed too low!');
      setRemainingGuesses(remainingGuesses - 1);
      
    } else {
      setMessage('Guessed too high!');
      setRemainingGuesses(remainingGuesses - 1);
    }
  };

  const restartGame = () => {
    setNumber(Math.floor(Math.random() * maxNumber) + 1);
    setGuess('');
    setMessage('');
    setRemainingGuesses(maxGuesses);
    setGameOver(false);
  };

  return (
    <div className="game">
      <h1 className="title">Can You Guess The Number?</h1>
      {!gameOver && (
        <div>
          <input type="number" className="input" value={guess} onChange={handleInputChange} />
          <button className="button" onClick={handleGuess}>Guess</button>
        </div>
      )}
      <p className="message">{message}</p>
      <p>{remainingGuessesText()}</p>
      {gameOver && (
        <div>
          <button className="button" onClick={restartGame}>Start New Game</button>
        <p></p>
        </div>
      )}
    </div>
  );
};

function Home() {
  return (
    <div className='page'>
      <p>To display settings and stats information click the buttons on the navigation bar!</p>
    </div>
  )
}

function Settings() {
  return (
    <div className='setting-page'>
      <h1>Settings Information</h1>
      <p>You can only use numbers including and between 1-100.</p>
      <p>You are allowed 5 guesses total per game session.</p>
    </div>
  )
}

function Stats() {
  return (
    <div className='stats-page'>
      <h1>Stats Information</h1>
      <p>Number of games won: </p>
      <p>Average number of guesses needed: </p>
    </div>
  )
}

const GuessApp = () => {
  return (
    <Router>
      <Nav />
      <Game maxNumber={100} maxGuesses={5} />
      <App />
    </Router>
  );
};

export default GuessApp;