import React, { Component } from 'react';

import black from './Images/castle_black.svg';
import white from './Images/castle_white.svg';

export default class Castle extends Component {

  constructor(props){
    super(props);
  }
  toString() {
    return "castle";
  }
  validMoves(){
    let [row, col] = this.props.coords,
        moves = [],
        board = this.props.getBoard();

    for(let x = row + 1; x < 8; x++) {
      if(board[x][col] === null || board[x][col].team !== this.props.team) {
        moves.push({x: x, y: col});
        if(board[x][col] !== null) {
          break;
        }
      }
      else {
        break;
      }
    }
    for(let x = row - 1; x > -1; x--) {
      if(board[x][col] === null || board[x][col].team !== this.props.team) {
        moves.push({x: x, y: col});
        if(board[x][col] !== null) {
          break;
        }
      }
      else {
        break;
      }
    }
    for(let y = col + 1; y < 8; y++) {
      if(board[row][y] === null || board[row][y].team !== this.props.team) {
        moves.push({x: row, y: y});
        if(board[row][y] !== null) {
          break;
        }
      }
      else {
        break;
      }
    }
    for(let y = col - 1; y > -1; y--) {
      if(board[row][y] === null || board[row][y].team !== this.props.team) {
        moves.push({x: row, y: y});
        if(board[row][y] !== null) {
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
  isValidMove(){
    return true
  }
  render() {
    if(this.props.team === "white") {
      return (<img src={white} alt="white castle" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
    else {
      return (<img src={black} alt="black castle" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
  }

}
