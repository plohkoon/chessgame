import React, { Component } from 'react';
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
        [{name: "castle", team: "white", coords: {x: 0, y: 0}},{name: "knight", team: "white", coords: {x: 0, y: 1}},{name: "bishop", team: "white", coords: {x: 0, y: 2}},{name: "king", team: "white", coords: {x: 0, y: 3}},{name: "queen", team: "white", coords: {x: 0, y: 4}},{name: "bishop", team: "white", coords: {x: 0, y: 5}},{name: "knight", team: "white", coords: {x: 0, y: 6}},{name: "castle", team: "white", coords: {x: 0, y: 7}}],
        [{name: "pawn", team: "white", coords: {x:1, y: 0}},{name: "pawn", team: "white", coords: {x:1, y: 1}},{name: "pawn", team: "white", coords: {x:1, y: 2}},{name: "pawn", team: "white", coords: {x:1, y: 3}},{name: "pawn", team: "white", coords: {x:1, y: 4}},{name: "pawn", team: "white", coords: {x:1, y: 5}},{name: "pawn", team: "white", coords: {x:1, y: 6}},{name: "pawn", team: "white", coords: {x:1, y: 7}}],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [{name: "pawn", team: "black", coords: {x:6, y: 0}},{name: "pawn", team: "black", coords: {x:6, y: 1}},{name: "pawn", team: "black", coords: {x:6, y: 2}},{name: "pawn", team: "black", coords: {x:6, y: 3}},{name: "pawn", team: "black", coords: {x:6, y: 4}},{name: "pawn", team: "black", coords: {x:6, y: 5}},{name: "pawn", team: "black", coords: {x:6, y: 6}},{name: "pawn", team: "black", coords: {x:6, y: 7}}],
        [{name: "castle", team: "black", coords: {x:7, y: 0}},{name: "knight", team: "black", coords: {x:7, y: 1}},{name: "bishop", team: "black", coords: {x:7, y: 2}},{name: "queen", team: "black", coords: {x:7, y: 3}},{name: "castle", team: "black", coords: {x:7, y: 4}},{name: "castle", team: "black", coords: {x:7, y: 5}},{name: "castle", team: "black", coords: {x:7, y: 6}},{name: "castle", team: "black", coords: {x:7, y: 7}}],
      ]
    }
  }

  movePiece(e, row, col) {
    let [initx, , inity] = e.dataTransfer.getData("initcoords");
    let board = this.state.board;
    let piece = board[initx][inity];

    piece.coords = {
      x: row,
      y: col
    }

    board[initx][inity] = null;
    board[row][col] = piece;

    this.setState({board: board});
  }

  getPiece(piece) {
    if(piece !== null) {
      switch(piece.name){
        case "pawn":
          return <Pawn team={piece.team} coords={[piece.coords.x, piece.coords.y]} />
        case "king":
          return <King team={piece.team} coords={[piece.coords.x, piece.coords.y]} />
        case "queen":
          return <Queen team={piece.team} coords={[piece.coords.x, piece.coords.y]} />
        case "castle":
          return <Castle team={piece.team} coords={[piece.coords.x, piece.coords.y]} />
        case "knight":
          return <Knight team={piece.team} coords={[piece.coords.x, piece.coords.y]} />
        case "bishop":
          return <Bishop team={piece.team} coords={[piece.coords.x, piece.coords.y]} />
    }}
  }

  renderBoard() {
    return this.state.board.map((rowArr, rowNum) => {
      return <tr className="gameRows" key={rowNum}>
        {rowArr.map((piece, colNum) => {
          return <td className="gameCell" key={colNum} onDragOver={(e)=>{e.preventDefault(); e.dataTransfer.setData("newCoords", [rowNum, colNum])}} onDrop={(e)=>{this.movePiece(e, rowNum, colNum)}}>{this.getPiece(piece)}</td>
        })}
      </tr>
    });
  }

  render() {
    return (
        <table className="table">
          <tbody>
            {this.renderBoard()}
          </tbody>
        </table>
    );
  }
}

export default App;
