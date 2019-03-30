import React, { Component } from 'react';
//grabbing the 2 SVG's
import black from './Images/bishop_black.svg';
import white from './Images/bishop_white.svg';

export default class Bishop extends Component {
  //Keeping instructor for consistency
  //eslint-disable-next-line
  constructor(props){
    super(props);
  }
  //if a toString is ever needed
  toString() {
    return "bishop";
  }
  //hunts through the board for valid moves
  validMoves() {
    //getting the values that are needed for calculations
    let [row, col] = this.props.coords,
        moves = [],
        board = this.props.getBoard(),
        team = this.props.team;
    //runs down to the right to find moves
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
  //puts needed data into the transfer event
  onDrag(e) {
    e.dataTransfer.setData("piece", this)
    e.dataTransfer.setData("initcoords", this.props.coords)
    e.dataTransfer.setData("validMoves", JSON.stringify(this.validMoves()))
  }
  render() {
    if(this.props.team === "white") {
      return (<img src={white} alt="white bishop" draggable={this.props.team === this.props.curTurn} onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
    else {
      return (<img src={black} alt="black bishop" draggable={this.props.team === this.props.curTurn} onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
  }

}
