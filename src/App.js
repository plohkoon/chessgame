//imports of basics
import React, { Component } from 'react';
import './Board.css';
//imports of all pieces
import Pawn   from'./pieces/Pawn.js';
import Bishop from './pieces/Bishop.js';
import Castle from './pieces/Castle.js';
import King   from './pieces/King.js';
import Knight from './pieces/Knight.js';
import Queen  from './pieces/Queen.js';

class App extends Component {
  constructor(props) {
    super(props);
    //initializes the board in state
    this.state = {
      board: [
        [{name: "castle", team: "white", coords: {x: 0, y: 0}},{name: "knight", team: "white", coords: {x: 0, y: 1}},{name: "bishop", team: "white", coords: {x: 0, y: 2}},{name: "king", team: "white", coords: {x: 0, y: 3}},{name: "queen", team: "white", coords: {x: 0, y: 4}},{name: "bishop", team: "white", coords: {x: 0, y: 5}},{name: "knight", team: "white", coords: {x: 0, y: 6}},{name: "castle", team: "white", coords: {x: 0, y: 7}}],
        [{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 0}},{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 1}},{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 2}},{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 3}},{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 4}},{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 5}},{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 6}},{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 7}}],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 0}},{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 1}},{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 2}},{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 3}},{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 4}},{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 5}},{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 6}},{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 7}}],
        [{name: "castle", team: "black", coords: {x:7, y: 0}},{name: "knight", team: "black", coords: {x:7, y: 1}},{name: "bishop", team: "black", coords: {x:7, y: 2}},{name: "queen", team: "black", coords: {x:7, y: 3}},{name: "king", team: "black", coords: {x:7, y: 4}},{name: "bishop", team: "black", coords: {x:7, y: 5}},{name: "knight", team: "black", coords: {x:7, y: 6}},{name: "castle", team: "black", coords: {x:7, y: 7}}],
      ],
      turn: "white"
    }
  }

  getBoard = () => {
    return this.state.board;
  }

  movePiece(e, row, col) {
    let validMoves = JSON.parse(e.dataTransfer.getData("validMoves"));
    if(!validMoves.find((element) => {
      return element.x === row && element.y === col;
    })) {
      return;
    }
    //gets the board, the piece and the initial point of the piece
    let [initx, , inity] = e.dataTransfer.getData("initcoords");
    let board = this.state.board;
    let piece = board[initx][inity];
    //sets the pieces pints to the new
    piece.coords = {
      x: row,
      y: col
    }
    //special logic for pawn first turn
    if(piece.name === "pawn" && piece.firstTurn) {
      piece.firstTurn = false;
    }
    //transfers the piece to new square
    board[initx][inity] = null;
    board[row][col] = piece;
    let nextTurn = (this.state.turn === "white") ? "black" : "white";
    //resets and rerenders board
    this.setState({board: board, turn: nextTurn});
  }

  getPiece(piece) {
    //skips if null
    if(piece !== null) {
      switch(piece.name){
        //goes through and finds which piece to render
        case "pawn":
          return <Pawn team={piece.team} firstTurn={piece.firstTurn} curTurn={this.state.turn} coords={[piece.coords.x, piece.coords.y]} getBoard={this.getBoard}/>
        case "king":
          return <King team={piece.team} curTurn={this.state.turn} coords={[piece.coords.x, piece.coords.y]} getBoard={this.getBoard}/>
        case "queen":
          return <Queen team={piece.team} curTurn={this.state.turn} coords={[piece.coords.x, piece.coords.y]} getBoard={this.getBoard}/>
        case "castle":
          return <Castle team={piece.team} curTurn={this.state.turn} coords={[piece.coords.x, piece.coords.y]} getBoard={this.getBoard}/>
        case "knight":
          return <Knight team={piece.team} curTurn={this.state.turn} coords={[piece.coords.x, piece.coords.y]} getBoard={this.getBoard}/>
        case "bishop":
          return <Bishop team={piece.team} curTurn={this.state.turn} coords={[piece.coords.x, piece.coords.y]} getBoard={this.getBoard}/>
        default:
          return
    }}
  }
  //traverses the board array and renders the rows and columns
  renderBoard() {
    //travers the rows and uses rowNum as the key
    return this.state.board.map((rowArr, rowNum) => {
      return <tr className="gameRows" key={rowNum}>
        {rowArr.map((piece, colNum) => {
          return <td className="gameCell" key={colNum} onDragOver={(e)=>{e.preventDefault(); e.dataTransfer.setData("newCoords", [rowNum, colNum])}} onDrop={(e)=>{this.movePiece(e, rowNum, colNum)}}>{this.getPiece(piece)}</td>
        })}
      </tr>
    });
  }

  render() {
    //renders the board in a table
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
