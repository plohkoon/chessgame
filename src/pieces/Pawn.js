import React, { Component } from 'react';
//gets image for pieces
import black from './Images/pawn_black.svg';
import white from './Images/pawn_white.svg';

import "./piece.css";

export default class Pawn extends Component {
//constructor for consistency
//eslint-disable-next-line
  constructor(props){
    super(props);
  }
  //toString if necessary
  toString(){
    return "pawn"
  }
  //gets list of valid moves
  validMoves() {
    let [row, col] = this.props.coords,
        moves = [],
        board = this.props.getBoard();
    //breaks it into case by team as move set is team dependant
    if(this.props.team === "white") {
      //standard move
      if(row + 1 < 8 && !board[row + 1][col]) {
        moves.push({x: row + 1, y: col});
      }
      //moves if capture available
      if(row + 1 < 8 && col + 1 < 8 && board[row + 1][col + 1] && board[row + 1][col + 1].team !== this.props.team) {
        moves.push({x: row + 1, y: col + 1});
      }
      if(row + 1 < 8 && col - 1 > -1 && board[row + 1][col - 1] && board[row + 1][col - 1].team !== this.props.team) {
        moves.push({x: row + 1, y: col - 1});
      }
      //special logic for firstTurn
      if(this.props.firstTurn && row + 2 < 8 && !board[row + 2][col]) {
        moves.push({x: row + 2, y: col});
      }
    }
    else {
      //standard moves
      if(row - 1 > -1&& !board[row - 1][col]) {
        moves.push({x: row - 1, y: col});
      }
      //moves if capture available
      if(row - 1 > -1 && col + 1 < 8 && board[row - 1][col + 1] && board[row - 1][col + 1].team !== this.props.team) {
        moves.push({x: row - 1, y: col + 1});
      }
      if(row - 1 > -1 && col - 1 > -1 && board[row - 1][col - 1] && board[row - 1][col - 1].team !== this.props.team) {
        moves.push({x: row - 1, y: col - 1});
      }
      //special logic for firstTurn
      if(this.props.firstTurn && row - 2 < 8 && !board[row - 2][col]) {
        moves.push({x: row - 2, y: col});
      }
    }

    console.log(moves);
    return moves;
  }
  //sets necessary data into dataTransfer
  onDrag(e) {
    e.dataTransfer.setData("piece", this)
    e.dataTransfer.setData("initcoords", this.props.coords)
    let moves = this.validMoves()
    this.props.highlightSpaces(moves);
  }
  render() {
    if(this.props.team === "white") {
      return (
        <img
          src={white}
          alt="white pawn"
          draggable={this.props.team === this.props.curTurn}
          onDragStart={(e)=>{
            this.onDrag(e)
          }}
          className="piece"
          onClick={e => {
            if(this.props.team === this.props.curTurn){
              this.props.setClickTransfer(this.props.coords, this, this.props.team)
              this.props.highlightSpaces(this.validMoves())
            }
          }}
        />
      )
    }
    else {
      return (
        <img src={black}
          alt="black pawn"
          draggable={this.props.team === this.props.curTurn}
          onDragStart={(e)=>{
            this.onDrag(e)
          }}
          className="piece"
          onClick={e => {
            if(this.props.team === this.props.curTurn){
              this.props.setClickTransfer(this.props.coords, this, this.props.team)
              this.props.highlightSpaces(this.validMoves())
            }
          }}
        />
      )
    }
  }

}
