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
        [{name: "castle", team: "white", coords: {x: 0, y: 0}},{name: "knight", team: "white", coords: {x: 0, y: 1}},{name: "bishop", team: "white", coords: {x: 0, y: 2}},{name: "king", castleable: true, team: "white", coords: {x: 0, y: 3}},{name: "queen", team: "white", coords: {x: 0, y: 4}},{name: "bishop", team: "white", coords: {x: 0, y: 5}},{name: "knight", team: "white", coords: {x: 0, y: 6}},{name: "castle", team: "white", coords: {x: 0, y: 7}}],
        [{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 0}},{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 1}},{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 2}},{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 3}},{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 4}},{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 5}},{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 6}},{name: "pawn", firstTurn: true, team: "white", coords: {x:1, y: 7}}],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 0}},{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 1}},{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 2}},{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 3}},{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 4}},{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 5}},{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 6}},{name: "pawn", firstTurn: true, team: "black", coords: {x:6, y: 7}}],
        [{name: "castle", team: "black", coords: {x:7, y: 0}},{name: "knight", team: "black", coords: {x:7, y: 1}},{name: "bishop", team: "black", coords: {x:7, y: 2}},{name: "queen", team: "black", coords: {x:7, y: 3}},{name: "king", castleable: true, team: "black", coords: {x:7, y: 4}},{name: "bishop", team: "black", coords: {x:7, y: 5}},{name: "knight", team: "black", coords: {x:7, y: 6}},{name: "castle", team: "black", coords: {x:7, y: 7}}],
      ],
      turn: "white",
      winner: null
    }
  }

  getBoard = () => {
    return this.state.board;
  }

  movePiece(e, row, col) {
    //gets list of moves and the move from list
    let validMoves = JSON.parse(e.dataTransfer.getData("validMoves")),
        move = validMoves.find((element) => {
          return element.x === row && element.y === col;
        });
    //if it is not valid move rejects and moves on
    if(!move) {
      return;
    }
    //gets the board, the piece and the initial point of the piece
    let [initx, , inity] = e.dataTransfer.getData("initcoords"),
        board = this.state.board,
        piece = board[initx][inity];

    if(board[row][col] && board[row][col].name === "king") {
      this.setState({winner: piece.team})
    }
    //sets the pieces pints to the new
    piece.coords = {
      x: row,
      y: col
    }
    //special logic for pawn first turn
    if(piece.name === "pawn" && piece.firstTurn) {
      piece.firstTurn = false;
    }
    //special logic for castline a king
    if(piece.name === "king" && piece.castleable) {
      //ensures castle cannot happen twice
      piece.castleable = false;
      //ensures move is castle move
      if(move.castle) {
        //conditions specific to right castle
        if(col === 6) {
          //swaps knight to new spot and gives proper coords
          board[row][5] = board[row][7];
          board[row][7] = null;
          board[row][5].coords = {
            x: row,
            y: 5
          }
        }
        //conditions specific to left castle
        else if(col === 1) {
          //swaps knight to new spot and gives proper coords
          board[row][2] = board[row][0];
          board[row][0] = null;
          board[row][2].coords = {
            x: row,
            y: 2
          }
        }
      }
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
          return <King team={piece.team} castleable={piece.castleable} curTurn={this.state.turn} coords={[piece.coords.x, piece.coords.y]} getBoard={this.getBoard}/>
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
  //render this winner announcment
  getWinElement() {
    return (this.state.winner) ? <h1>{this.state.winner}</h1> : <div></div>
  }

  render() {
    //renders the board in a table
    return (
      <div>
        {this.getWinElement()}
        <table className="table">
          <tbody>
            {this.renderBoard()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
