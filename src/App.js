import React, { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <Board />
     
    </div>
  );
}


function Board() {
  const [xisnext, setxisnext] = useState(true);
  const [square, setsquare] = useState(Array(9).fill(null));
  function restart(){
    setxisnext(true);
    setsquare(Array(9).fill(null));
  }
  function handleclick(i) {
    if (square[i] || calculatewinner(square)) {
      return;
    }
    const nextsqaure = square.slice();
    if (xisnext) {
      nextsqaure[i] = "X";
    } else {
      nextsqaure[i] = "O";
    }

    setsquare(nextsqaure);
    setxisnext(!xisnext);
  }

  const winner = calculatewinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xisnext ? "X" : "O");
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board">
        {[0, 1, 2].map(row => (
          <div key={row} className="board-row">
            {[0, 1, 2].map(col => (
              <Square
                key={col}
                value={square[row * 3 + col]}
                onSquareClick={() => handleclick(row * 3 + col)}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={restart} className="restart">Restart </button>
    </div>
    

  );
}

function calculatewinner(square) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}

export default App;
