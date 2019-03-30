import React, { Component } from 'react';

import black from './Images/king_black.svg';
import white from './Images/king_white.svg';

export default class King extends Component {

  constructor(props){
    super(props);
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
      return (<img src={white} alt="white king" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
    else {
      return (<img src={black} alt="black king" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
  }

}
