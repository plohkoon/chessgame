import React, { Component } from 'react';

import black from './Images/bishop_black.svg';
import white from './Images/bishop_white.svg';

export default class Bishop extends Component {

  constructor(props){
    super(props);
  }
  validMoves() {

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
      return (<img src={white} alt="white bishop" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
    else {
      return (<img src={black} alt="black bishop" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
  }

}
