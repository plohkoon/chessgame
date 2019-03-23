import React, { Component } from 'react';

import black from './Images/king_black.svg';
import white from './Images/king_white.svg';

export default class King extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if(this.props.team === "white") {
      return (<img src={white} alt="white king" draggable className="piece" />)
    }
    else {
      return (<img src={black} alt="black king" draggable className="piece" />)
    }
  }

}
