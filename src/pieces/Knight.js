import React, { Component } from 'react';
//getes image
import black from './Images/knight_black.svg';
import white from './Images/knight_white.svg';

export default class Knight extends Component {
  //constructor for consistency
  //eslint-disable-next-line
  constructor(props){
    super(props);
  }
  //toString if needed
  toString() {
    return "knight";
  }
  //gets list of moves
  validMoves() {
    let [row, col] = this.props.coords,
        moves = [],
        board = this.props.getBoard(),
        team = this.props.team;
    //potential moves moving down board
    let x = row + 2,
        y = col + 1;
    if(x < 8 && y < 8 && (board[x][y] === null || board[x][y].team !== team)) {
      moves.push({x: x, y: y});
    }
    y = col - 1;
    if(x < 8 && y > -1 && (board[x][y] === null || board[x][y].team !== team)) {
      moves.push({x: x, y: y});
    }
    //potential moves moving up board
    x = row - 2;
    y = col + 1;
    if(x > -1 && y < 8 && (board[x][y] === null || board[x][y].team !== team)) {
      moves.push({x: x, y: y});
    }
    y = col - 1;
    if(x > -1 && y > -1 && (board[x][y] === null || board[x][y].team !== team)) {
      moves.push({x: x, y: y});
    }
    //potential moves moving right
    x = row + 1;
    y = col + 2;
    if(x < 8 && y < 8 && (board[x][y] === null || board[x][y].team !== team)) {
      moves.push({x: x, y: y});
    }
    x = row - 1;
    if(x > -1 && y < 8 && (board[x][y] === null || board[x][y].team !== team)) {
      moves.push({x: x, y: y});
    }
    //potential moves moving left
    x = row + 1;
    y = col - 2;
    if(x < 8 && y > -1 && (board[x][y] === null || board[x][y].team !== team)) {
      moves.push({x: x, y: y});
    }
    x = row - 1
    if(x > -1 && y > -1 && (board[x][y] === null || board[x][y].team !== team)) {
      moves.push({x: x, y: y});
    }
    console.log(moves);
    return moves;
  }
  //puts necessary value into datatransfer
  onDrag(e) {
    e.dataTransfer.setData("piece", this)
    e.dataTransfer.setData("initcoords", this.props.coords)
    let moves = this.validMoves()
    this.props.highlightSpaces(moves);
  }
  render() {
    if(this.props.team === "white") {
      return (
        <img
          src={white}
          alt="white knight"
          draggable={this.props.team === this.props.curTurn}
          onDragStart={(e)=>{
            this.onDrag(e)
          }}
          className="piece"
          onClick={e => {
            this.props.setClickTransfer(this.props.coords, this)
            this.props.highlightSpaces(this.validMoves())
          }}
        />
      )
    }
    else {
      return (
        <img
          src={black}
          alt="black knight"
          draggable={this.props.team === this.props.curTurn}
          onDragStart={(e)=>{
            this.onDrag(e)
          }}
          className="piece"
          onClick={e => {
            this.props.setClickTransfer(this.props.coords, this)
            this.props.highlightSpaces(this.validMoves())
          }}
        />
      )
    }
  }

}
