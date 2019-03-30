import React, { Component } from 'react';
//get piece images
import black from './Images/castle_black.svg';
import white from './Images/castle_white.svg';

export default class Castle extends Component {
  //constructor for consistency
  //eslint-disable-next-line
  constructor(props){
    super(props);
  }
  //toString if needed
  toString() {
    return "castle";
  }
  //gets an array of valid moves
  validMoves(){
    //gets neede values
    let [row, col] = this.props.coords,
        moves = [],
        board = this.props.getBoard();
        //checking down the board
    for(let x = row + 1; x < 8; x++) {
      //if spot is empty or an enemy
      if(board[x][col] === null || board[x][col].team !== this.props.team) {
        //adds move to array
        moves.push({x: x, y: col});
        if(board[x][col] !== null) {
          break;
        }
      }
      //if spot is ally breaks
      else {
        break;
      }
    }
    //moving down board with same logic
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
    //moving right on board with same logic
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
    //moves left on board with same logic
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
  //puts necessary data thats need for move
  onDrag(e) {
    e.dataTransfer.setData("piece", this)
    e.dataTransfer.setData("initcoords", this.props.coords)
    e.dataTransfer.setData("validMoves", JSON.stringify(this.validMoves()))
  }
  render() {
    if(this.props.team === "white") {
      return (<img src={white} alt="white castle" draggable={this.props.team === this.props.curTurn} onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
    else {
      return (<img src={black} alt="black castle" draggable={this.props.team === this.props.curTurn} onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
  }

}
