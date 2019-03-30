import React, { Component } from 'react';

import black from './Images/queen_black.svg';
import white from './Images/queen_white.svg';

import './piece.css';

export default class Queen extends Component {

  constructor(props){
    super(props);
  }
  toString() {
    return "queen";
  }
  isValidMove(){
    return true
  }

  validMoves() {
    let [row, col] = this.props.coords,
        moves = [],
        board = this.props.getBoard(),
        team = this.props.team;

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
      return (<img src={white} alt="white queen" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
    else {
      return (<img src={black} alt="black queen" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
  }

}
