import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square Component
function SingleSquare(props) {
  return (
    <button className="singleSquare" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}


// Board Component
class Board extends React.Component {
  // Initialize the State
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  renderSingleSquare(i) {
    return <SingleSquare value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }
  render() {
    const winner = calculateWinner(this.state.squares);
    let playerStatus;
    if(winner) {
      playerStatus = "Winner: " + winner;
    } else {
      playerStatus = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="playerStatus">{playerStatus}</div>
        <div className="boardRow">
          {this.renderSingleSquare(0)}
          {this.renderSingleSquare(1)}
          {this.renderSingleSquare(2)}
        </div>
        <div className="boardRow">
          {this.renderSingleSquare(3)}
          {this.renderSingleSquare(4)}
          {this.renderSingleSquare(5)}
        </div>
        <div className="boardRow">
          {this.renderSingleSquare(6)}
          {this.renderSingleSquare(7)}
          {this.renderSingleSquare(8)}
        </div>
      </div>
      );
  }
}

// Game Component
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="gameBoard">
          <Board />
        </div>
        <div className="gameInfo">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render (
  <Game />,
  document.getElementById('root')
);

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
