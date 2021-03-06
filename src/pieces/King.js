import React, { Component } from 'react';
//gets image files
import black from './Images/king_black.svg';
import white from './Images/king_white.svg';

export default class King extends Component {
  //constructor for consistency
  //eslint-disable-next-line
  constructor(props){
    super(props);
  }
  //toString if needed
  toString() {
    return "king";
  }
  //scans through board and gets valide moves
  validMoves() {
    let [row, col] = this.props.coords,
        moves = [],
        board = this.props.getBoard(),
        team = this.props.team;
    //iterates through at most the 3 rows around the king
    for(let x = row - 1; x < 8 && x < row + 2; x++) {
      //iterates through at most the 3 columns around the king
      for(let y = col - 1; y < 8 && y < col + 2; y++) {
        //if the position is not in the king
        if((x !== row || y !== col) && x > -1 && y > -1 && (board[x][y] === null || board[x][y].team !== team)){
          moves.push({x: x, y: y});
        }
      }
    }
    if(this.props.castleable) {
      if(board[row][0].name === "castle") {
        let bool = true;
        for(let i = 1; i < col && bool; i++) {
          bool = (board[row][i] === null)
        }
        if(bool) {
          moves.push({x: row, y: 1, castle: true});
        }
      }
      if(board[row][7].name === "castle") {
        let bool = true;
        for(let i = 6; i > col && bool; i--) {
          bool = (board[row][i] === null);
        }
        if(bool) {
          moves.push({x: row, y: 6, castle: true})
        }
      }
    }
    console.log(moves)
    return moves;
  }
  //puts necessary values into the transfer
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
          alt="white king"
          draggable={this.props.team === this.props.curTurn}
          onDragStart={(e)=>{
            this.onDrag(e)
          }}
          className="piece"
          onClick={e => {
            if(this.props.team === this.props.curTurn){
              this.props.setClickTransfer(this.props.coords, this, this.props.team)
              this.props.highlightSpaces(this.validMoves())
            }
          }}
        />
      )
    }
    else {
      return (
        <img
          src={black}
          alt="black king"
          draggable={this.props.team === this.props.curTurn}
          onDragStart={(e)=>{
            this.onDrag(e)
          }}
          className="piece"
          onClick={e => {
            if(this.props.team === this.props.curTurn){
              this.props.setClickTransfer(this.props.coords, this, this.props.team)
              this.props.highlightSpaces(this.validMoves())
            }
          }}
        />
      )
    }
  }

}
