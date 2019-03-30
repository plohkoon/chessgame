import React, { Component } from 'react';
//inmports images for piece
import black from './Images/queen_black.svg';
import white from './Images/queen_white.svg';

import './piece.css';

export default class Queen extends Component {
  //constructor for conssitency
  //eslint-disable-next-line
  constructor(props){
    super(props);
  }
  //toString if needed
  toString() {
    return "queen";
  }
  validMoves() {
    let [row, col] = this.props.coords,
        moves = [],
        board = this.props.getBoard(),
        team = this.props.team;
    //runs up board
    for(let x = row + 1; x < 8; x++) {
      if(board[x][col] === null || board[x][col].team !== team) {
        moves.push({x: x, y: col});
        if(board[x][col] !== null) {
          break;
        }
      }
      else {
        break;
      }
    }
    //runs down board
    for(let x = row - 1; x > -1; x--) {
      if(board[x][col] === null || board[x][col].team !== team) {
        moves.push({x: x, y: col});
        if(board[x][col] !== null) {
          break;
        }
      }
      else {
        break;
      }
    }
    //runs right on board
    for(let y = col + 1; y < 8; y++) {
      if(board[row][y] === null || board[row][y].team !== team) {
        moves.push({x: row, y: y});
        if(board[row][y] !== null) {
          break;
        }
      }
      else {
        break;
      }
    }
    //runs left on board
    for(let y = col - 1; y > -1; y--) {
      if(board[row][y] === null || board[row][y].team !== team) {
        moves.push({x: row, y: y});
        if(board[row][y] !== null) {
          break;
        }
      }
      else {
        break;
      }
    }
    //runs down to right
    for(let x = row + 1, y = col + 1; x < 8 && y < 8; x++, y++) {
      //if space is empty or enemy then adds to array
      if(board[x][y] === null || board[x][y].team !== team) {
        moves.push({x: x, y: y});
        //if it reaches an enemy then it breaks the loop and continues
        if(board[x][y] !== null) {
          break;
        }
      }
      //
      else {
        break;
      }
    }
    //runs down to the left with same logic
    for(let x = row + 1, y = col - 1; x < 8 && y > -1; x++, y--) {
      if(board[x][y] === null || board[x][y].team !== team) {
        moves.push({x: x, y: y});
        if(board[x][y] !== null) {
          break;
        }
      }
      else {
        break;
      }
    }
    //runs up to the left with same logic
    for(let x = row - 1, y = col - 1; x > -1 && y > -1; x--, y--) {
      if(board[x][y] === null || board[x][y].team !== team) {
        moves.push({x: x, y: y});
        if(board[x][y] !== null) {
          break;
        }
      }
      else {
        break;
      }
    }
    //runs up to the right with same logice
    for(let x = row - 1, y = col + 1; x > -1 && y < 8; x--, y++) {
      if(board[x][y] === null || board[x][y].team !== team) {
        moves.push({x: x, y: y});
        if(board[x][y] !== null) {
          break;
        }
      }
      else {
        break;
      }
    }
    console.log(moves);
    return moves;
  }

  onDrag(e) {
    e.dataTransfer.setData("piece", this)
    e.dataTransfer.setData("initcoords", this.props.coords)
    e.dataTransfer.setData("validMoves", JSON.stringify(this.validMoves()))
  }

  render() {
    if(this.props.team === "white") {
      return (<img src={white} alt="white queen" draggable={this.props.team === this.props.curTurn} onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
    else {
      return (<img src={black} alt="black queen" draggable={this.props.team === this.props.curTurn} onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
  }

}
