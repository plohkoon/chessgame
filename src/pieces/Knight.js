import React, { Component } from 'react';

import black from './Images/knight_black.svg';
import white from './Images/knight_white.svg';

export default class Knight extends Component {

  constructor(props){
    super(props);
  }
  validMoves() {
    return null
  }
  isValidMove(){
    return true
  }
  onDrag(e) {
    e.dataTransfer.setData("piece", this)
    e.dataTransfer.setData("initcoords", this.props.coords)
    e.dataTransfer.setData("validMoves", this.validMoves())
  }
  render() {
    if(this.props.team === "white") {
      return (<img src={white} alt="white knight" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
    else {
      return (<img src={black} alt="black knight" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
  }

}
