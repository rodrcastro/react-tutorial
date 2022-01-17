//import { render } from "@testing-library/react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
  
}


function Board(props) {

  function renderSquare(i) {
    return <Square value={props.game[i]} onClick={() => props.onClick(i)}/>;
  }

  return (
    <div>
      <div className="board-row">        
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}


function Game() {
  
  // Setting state
  const [history, setHistory] = useState(
    [{
      game: Array(9).fill(null)
    }]
  );
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [coordinates, setCoordinates] = useState([{}]);
  const [currentIndex, setCurrentIndex] = useState(null);
  

  // Setting the current state of the game based on the most recent event
  const current = history[stepNumber];
  
  // Looping over the history to display past moves as buttons
  const moves = history.map((step, move) => {
    const description = move ?
    `Go to move #${move} - Column ${coordinates[move].col}, Row ${coordinates[move].row}` :
    'Go to game start'
    // 'move' refers to the current history element index
    

    return (
      <li key={move} >
        <button onClick={() => jumpTo(move)} style={{fontWeight: move === currentIndex ? 600 : 400}}>{description}</button>
      </li>
    )
  })

  // Calculate Winner and display current match status
  let status

  const winner = calculateWinner(current.game); // Passed current.game instead of game to be able to display the most recent update

  if(winner){
    status = `Winner: ${winner}`
  } else {
    status = `Next player is: ${xIsNext ? 'X' : 'O'}`;
  }

  // Setting function handleClick to pass as a prop to the Board component
  function handleClick(i) {
    const coordinates2 = [
      {
        col: 1,
        row: 1
      },
      {
        col: 2,
        row: 1
      },
      {
        col: 3,
        row: 1
      },
      {
        col: 1,
        row: 2
      },
      {
        col: 2,
        row: 2
      },
      {
        col: 3,
        row: 2
      },
      {
        col: 1,
        row: 3
      },
      {
        col: 2,
        row: 3
      },
      {
        col: 3,
        row: 3
      },
    ]

    history.slice(0, stepNumber + 1);
    const squares = current.game.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O'
    setHistory(history.concat([{game: squares}]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
    
    setCoordinates(coordinates.concat(coordinates2[i]))


    // Unlike the array push() method you might be more familiar with, the concat() method doesn’t mutate the original array, so we prefer it.
  }

  // Setting jumpTo function for the history displayed to the user
  function jumpTo(step, index) {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
    setCurrentIndex(step)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board game={current.game} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square">
//         {/* TODO */}
//       </button>
//     );
//   }
// }

// class Board extends React.Component {
//   renderSquare(i) {
//     return <Square />;
//   }

//   render() {
//     const status = 'Next player: X';

//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
//   render() {
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board />
//         </div>
//         <div className="game-info">
//           <div>{/* status */}</div>
//           <ol>{/* TODO */}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
