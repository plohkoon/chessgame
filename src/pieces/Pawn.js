import React, { Component } from 'react';

import black from './Images/pawn_black.svg';
import white from './Images/pawn_white.svg';

export default class Pawn extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if(this.props.team === "white") {
      return (<img src={white} alt="white pawn" draggable className="piece" />)
    }
    else {
      return (<img src={black} alt="black pawn" draggable className="piece" />)
    }
  }

}
