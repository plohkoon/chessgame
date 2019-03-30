import React, { Component } from 'react';

import black from './Images/queen_black.svg';
import white from './Images/queen_white.svg';

import './piece.css';

export default class Queen extends Component {

  constructor(props){
    super(props);
  }

  isValidMove(){
    return true
  }

  validMoves() {
    let [row, col] = this.props.coords,
        moves = [];

    for(let i = 0; i < 8; i++){
      if(i !== row){
        moves.push([i, col]);
      }
    }
    for(let i = 0; i< 8; i++) {
      if(i !== col) {
        moves.push([row,i]);
      }
    }
    return moves;
  }

  onDrag(e) {
    e.dataTransfer.setData("piece", this)
    e.dataTransfer.setData("initcoords", this.props.coords)
    e.dataTransfer.setData("validMoves", this.validMoves())
  }

  render() {
    if(this.props.team === "white") {
      return (<img src={white} alt="white queen" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
    else {
      return (<img src={black} alt="black queen" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
  }

  toString() {
    return "queen"
  }

}
