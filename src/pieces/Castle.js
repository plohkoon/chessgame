import React, { Component } from 'react';

import black from './Images/castle_black.svg';
import white from './Images/castle_white.svg';

export default class Castle extends Component {

  constructor(props){
    super(props);
  }
  validMoves(){
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
      return (<img src={white} alt="white castle" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
    else {
      return (<img src={black} alt="black castle" draggable onDragStart={(e)=>{this.onDrag(e)}} className="piece" />)
    }
  }

}
