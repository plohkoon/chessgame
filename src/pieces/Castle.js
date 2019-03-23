import React, { Component } from 'react';

import black from './Images/castle_black.svg';
import white from './Images/castle_white.svg';

export default class Castle extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if(this.props.team === "white") {
      return (<img src={white} alt="white castle" draggable className="piece" />)
    }
    else {
      return (<img src={black} alt="black castle" draggable className="piece" />)
    }
  }

}
