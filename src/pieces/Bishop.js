import React, { Component } from 'react';

import black from './Images/bishop_black.svg';
import white from './Images/bishop_white.svg';

export default class Bishop extends Component {

  constructor(props){
    super(props);
  }
  toString() {
    return "bishop";
  }
  validMoves() {
    let [row, col] = this.props.coords,
        moves = [],
        board = this.props.getBoard(),
        team = this.props.team;

    for(let x = row + 1, y = col + 1; x < 8 && y < 8; x++, y++) {
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
  isValidMove(){
    return true
  }
  render() {
    if(this.props.team === "white") {
      return (<img src={white} alt="white bishop" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
    else {
      return (<img src={black} alt="black bishop" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
  }

}
