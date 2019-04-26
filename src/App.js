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
         //white special pieces
        [
          {name: "castle", team: "white", coords: {x: 0, y: 0}},
          {name: "knight", team: "white", coords: {x: 0, y: 1}},
          {name: "bishop", team: "white", coords: {x: 0, y: 2}},
          {name: "king",   team: "white", coords: {x: 0, y: 3}, castleable: true},
          {name: "queen",  team: "white", coords: {x: 0, y: 4}},
          {name: "bishop", team: "white", coords: {x: 0, y: 5}},
          {name: "knight", team: "white", coords: {x: 0, y: 6}},
          {name: "castle", team: "white", coords: {x: 0, y: 7}},
        ],
        //white pawns
        [
          {name: "pawn",   team: "white", coords: {x: 1, y: 0}, firstTurn: true},
          {name: "pawn",   team: "white", coords: {x: 1, y: 1}, firstTurn: true},
          {name: "pawn",   team: "white", coords: {x: 1, y: 2}, firstTurn: true},
          {name: "pawn",   team: "white", coords: {x: 1, y: 3}, firstTurn: true},
          {name: "pawn",   team: "white", coords: {x: 1, y: 4}, firstTurn: true},
          {name: "pawn",   team: "white", coords: {x: 1, y: 5}, firstTurn: true},
          {name: "pawn",   team: "white", coords: {x: 1, y: 6}, firstTurn: true},
          {name: "pawn",   team: "white", coords: {x: 1, y: 7}, firstTurn: true},
        ],
        //mid spaces
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        //black pawns
        [
          {name: "pawn",   team: "black", coords: {x: 6, y: 0}, firstTurn: true},
          {name: "pawn",   team: "black", coords: {x: 6, y: 1}, firstTurn: true},
          {name: "pawn",   team: "black", coords: {x: 6, y: 2}, firstTurn: true},
          {name: "pawn",   team: "black", coords: {x: 6, y: 3}, firstTurn: true},
          {name: "pawn",   team: "black", coords: {x: 6, y: 4}, firstTurn: true},
          {name: "pawn",   team: "black", coords: {x: 6, y: 5}, firstTurn: true},
          {name: "pawn",   team: "black", coords: {x: 6, y: 6}, firstTurn: true},
          {name: "pawn",   team: "black", coords: {x: 6, y: 7}, firstTurn: true},
        ],
        //black special pieces
        [
          {name: "castle", team: "black", coords: {x: 7, y: 0}},
          {name: "knight", team: "black", coords: {x: 7, y: 1}},
          {name: "bishop", team: "black", coords: {x: 7, y: 2}},
          {name: "queen",  team: "black", coords: {x: 7, y: 3}},
          {name: "king",   team: "black", coords: {x: 7, y: 4}, castleable: true},
          {name: "bishop", team: "black", coords: {x: 7, y: 5}},
          {name: "knight", team: "black", coords: {x: 7, y: 6}},
          {name: "castle", team: "black", coords: {x: 7, y: 7}}],
      ],
      //keeps track of turn and if there is a winner
      turn: "white",
      winner: null,
      //keeps track of if a piece is moving and what spaces it can move to
      moving: false,
      isMove: [
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
      ],
      clickTransfer: {
        piece: null,
        initcoords: null
      }
    }
  }
  //returns the board
  getBoard = () => {
    return this.state.board;
  }
  //executes the move
  movePiece(row, col, e) {
    console.log("moving piece")
    //gets list of moves and the move from list
    let move = this.state.isMove[row][col]
    //if it is not valid move rejects and moves on
    if(!move) {
      //resets the state for use on next move
      this.setState(
        {
          moving: false,
          isMove: [
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
          ],
          clickTransfer: {
            piece: null,
            initcoords: null
          }
        }
      );
      return;
    }
    //gets the board, the piece and the initial point of the piece
    let initx, inity;
    e ?
        [initx, , inity]  = e.dataTransfer.getData("initcoords") :
        [initx, inity]     = this.state.clickTransfer.coords;
    let board = this.state.board,
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
    this.setState(
      {
        board: board,
        turn: nextTurn,
        moving: false,
        isMove: [
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
        ],
        clickTransfer: {
          piece: null,
          coords: null
        }
      }
    );
  }

  setClickTransfer = (coords, piece) => {
    this.setState({clickTransfer: {
      coords: coords,
      piece: piece
    }})
    console.log(this.state.clickTransfer);
  }
  //gets the piece based on the name
  getPiece(piece) {
    //skips if null
    if(piece !== null) {
      switch(piece.name){
        //goes through and finds which piece to render
        case "pawn":
          return <Pawn
            team={piece.team}
            firstTurn={piece.firstTurn}
            curTurn={this.state.turn}
            coords={[piece.coords.x, piece.coords.y]}
            getBoard={this.getBoard}
            highlightSpaces={this.highlightSpaces}
            setClickTransfer={this.setClickTransfer}
          />
        case "king":
          return <King
            team={piece.team}
            castleable={piece.castleable}
            curTurn={this.state.turn}
            coords={[piece.coords.x, piece.coords.y]}
            getBoard={this.getBoard}
            highlightSpaces={this.highlightSpaces}
            setClickTransfer={this.setClickTransfer}
          />
        case "queen":
          return <Queen
            team={piece.team}
            curTurn={this.state.turn}
            coords={[piece.coords.x, piece.coords.y]}
            getBoard={this.getBoard}
            highlightSpaces={this.highlightSpaces}
            setClickTransfer={this.setClickTransfer}
          />
        case "castle":
          return <Castle
            team={piece.team}
            curTurn={this.state.turn}
            coords={[piece.coords.x, piece.coords.y]}
            getBoard={this.getBoard}
            highlightSpaces={this.highlightSpaces}
            setClickTransfer={this.setClickTransfer}
          />
        case "knight":
          return <Knight
            team={piece.team}
            curTurn={this.state.turn}
            coords={[piece.coords.x, piece.coords.y]}
            getBoard={this.getBoard}
            highlightSpaces={this.highlightSpaces}
            setClickTransfer={this.setClickTransfer}
          />
        case "bishop":
          return <Bishop
            team={piece.team}
            curTurn={this.state.turn}
            coords={[piece.coords.x, piece.coords.y]}
            getBoard={this.getBoard}
            highlightSpaces={this.highlightSpaces}
            setClickTransfer={this.setClickTransfer}
          />
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
          return <td
            className={
              this.state.isMove[rowNum][colNum] ? "gameCell moveSpace" : "gameCell"
            }
            key={colNum}
            onDragOver={(e)=>{
              e.preventDefault();
              e.dataTransfer.setData("newCoords", [rowNum, colNum])
            }}
            onDrop={(e)=>{
              this.movePiece(rowNum, colNum, e)}
            }
            onClick={() => {
              if(this.state.clickTransfer.piece !== null) {
                this.movePiece(rowNum, colNum, null);
              }
            }}
          >
            {this.getPiece(piece)}
          </td>
        })}
      </tr>
    });
  }
  //render this winner announcment
  getWinElement() {
    return (this.state.winner) ? <h1>{this.state.winner}</h1> : <div></div>
  }
  //highlights the spaces available for move
  highlightSpaces = (spaces)=> {
    console.log("highlightingSpaces");
    //if the move spaces have already been calculated stops the funcion
    if(this.state.moving) {
      return;
    }
    //initializes the isMove array
    let isMoveArray = [
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false]
        ];
    //runs through each possible movoe and sets that space to true in isMove
    spaces.forEach((element) => {
      isMoveArray[element.x][element.y] = true
    })
    //sets the state to trigger a rerender with move points
    this.setState(
      {
        moving: true,
        isMove: isMoveArray
      }
    );
  }
  render() {
    //renders the board in a table
    return (
      <div>
        {this.getWinElement()}
        <table
          className="table"
        >
          <tbody>
            {this.renderBoard()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
