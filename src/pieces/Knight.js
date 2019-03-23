import React, { Component } from 'react';

import black from './Images/knight_black.svg';
import white from './Images/knight_white.svg';

export default class Knight extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if(this.props.team === "white") {
      return (<img src={white} alt="white knight" draggable className="piece" />)
    }
    else {
      return (<img src={black} alt="black knight" draggable className="piece" />)
    }
  }

}
