import React, { Component } from 'react';
import logo from './logo.svg';
import './Board.css';

import Pawn   from'./pieces/Pawn.js';
import Bishop from './pieces/Bishop.js';
import Castle from './pieces/Castle.js';
import King   from './pieces/King.js';
import Knight from './pieces/Knight.js';
import Queen  from './pieces/Queen.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [<Castle team="white" />,<Knight team="white" />,<Bishop team="white" />,<King team="white" />,<Queen team="white" />,<Bishop team="white" />,<Knight team="white" />,<Castle team="white" />],
        [<Pawn team="white" />,<Pawn team="white" />,<Pawn team="white" />,<Pawn team="white" />,<Pawn team="white" />,<Pawn team="white" />,<Pawn team="white" />,<Pawn team="white" />],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [<Pawn team="black" />,<Pawn team="black" />,<Pawn team="black" />,<Pawn team="black" />,<Pawn team="black" />,<Pawn team="black" />,<Pawn team="black" />,<Pawn team="black" />],
        [<Castle team="black" />,<Knight team="black" />,<Bishop team="black" />,<King team="black" />,<Queen team="black" />,<Bishop team="black" />,<Knight team="black" />,<Castle team="black" />],
      ],
    }
  }

  renderBoard() {
    return this.state.board.map((row) => {
      return <tr className="gameRows">
        {row.map((piece) => {
          return <td className="gameCell">{piece}</td>
        })}
      </tr>
    });
  }

  render() {
    return (
        <table className="table">
          {this.renderBoard()}
        </table>
    );
  }
}

/*
<img src={logo} className="App-logo" alt="logo" />
<p>
  Edit <code>src/App.js</code> and save to reload.
</p>
<a
  className="App-link"
  href="https://reactjs.org"
  target="_blank"
  rel="noopener noreferrer"
>
  Learn React
</a>
*/

export default App;
