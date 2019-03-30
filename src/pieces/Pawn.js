import React, { Component } from 'react';

import black from './Images/pawn_black.svg';
import white from './Images/pawn_white.svg';

export default class Pawn extends Component {

  constructor(props){
    super(props);
  }
  toString(){
    return "pawn"
  }
  validMoves() {
    let [row, col] = this.props.coords,
        moves = [],
        board = this.props.getBoard();

    if(this.props.team === "white") {
      if(row + 1 < 8 && !board[row + 1][col]) {
        moves.push({x: row + 1, y: col});
      }
      if(row + 1 < 8 && col + 1 < 8 && board[row + 1][col + 1] && board[row + 1][col + 1].team !== this.props.team) {
        moves.push({x: row + 1, y: col + 1});
      }
      if(row + 1 < 8 && col - 1 > -1 && board[row + 1][col - 1] && board[row + 1][col - 1].team !== this.props.team) {
        moves.push({x: row + 1, y: col - 1});
      }
    }
    else {
      if(row - 1 > -1&& !board[row - 1][col]) {
        moves.push({x: row - 1, y: col});
      }
      if(row - 1 > -1 && col + 1 < 8 && board[row - 1][col + 1] && board[row - 1][col + 1].team !== this.props.team) {
        moves.push({x: row - 1, y: col + 1});
      }
      if(row - 1 > -1 && col - 1 > -1 && board[row - 1][col - 1] && board[row - 1][col - 1].team !== this.props.team) {
        moves.push({x: row - 1, y: col - 1});
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
      return (<img src={white} alt="white pawn" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
    else {
      return (<img src={black} alt="black pawn" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
  }

}
