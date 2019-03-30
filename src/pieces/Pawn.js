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
    return null;
  }
  onDrag(e) {
    e.dataTransfer.setData("piece", this)
    e.dataTransfer.setData("initcoords", this.props.coords)
    e.dataTransfer.setData("validMoves", this.validMoves())
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
