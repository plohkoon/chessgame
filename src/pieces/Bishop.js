import React, { Component } from 'react';

import black from './Images/bishop_black.svg';
import white from './Images/bishop_white.svg';

export default class Bishop extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if(this.props.team === "white") {
      return (<img src={white} alt="white bishop" draggable className="piece" />)
    }
    else {
      return (<img src={black} alt="black bishop" draggable className="piece" />)
    }
  }

}
