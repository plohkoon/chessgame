import React, { Component } from 'react';

import black from './Images/queen_black.svg';
import white from './Images/queen_white.svg';

import './piece.css';

export default class Queen extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if(this.props.team === "white") {
      return (<img src={white} alt="white queen" draggable className="piece" />)
    }
    else {
      return (<img src={black} alt="black queen" draggable className="piece" />)
    }
  }

}
