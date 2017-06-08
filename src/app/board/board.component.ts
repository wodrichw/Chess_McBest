import { Component, OnInit } from '@angular/core';
import { PiecesComponent } from './../pieces/pieces.component'
import { MoveMaster } from './move-master'


const startPieces: string[][] = [
  ['rb'], ['nb'], ['bb'], ['qb'], ['kb'], ['bb'], ['nb'], ['rb'],
  ['pb'], ['pb'], ['pb'], ['pb'], ['pb'], ['pb'], ['pb'], ['pb'],
  ['bl'], ['bl'], ['bl'], ['bl'], ['bl'], ['bl'], ['bl'], ['bl'],
  ['bl'], ['bl'], ['bl'], ['bl'], ['bl'], ['bl'], ['bl'], ['bl'],
  ['bl'], ['bl'], ['bl'], ['bl'], ['bl'], ['bl'], ['bl'], ['bl'],
  ['bl'], ['bl'], ['bl'], ['bl'], ['bl'], ['bl'], ['bl'], ['bl'],
  ['pw'], ['pw'], ['pw'], ['pw'], ['pw'], ['pw'], ['pw'], ['pw'],
  ['rw'], ['nw'], ['bw'], ['qw'], ['kw'], ['bw'], ['nw'], ['rw']
];



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent {
  selectedPiece: number;
  mm: MoveMaster = new MoveMaster;
  pieces: string[][] = startPieces;
  turn: string = 'w';
  constructor() {
    var i;
    for (i = 0; i < this.pieces.length; i++) {
      this.pieces[i].push(i);
    }
  }
  onPieceToggle(event): void {
    this.move(event);
  }
  move(id: number): void {
    console.log(id);
    if (this.selectedPiece == null) {
      if (this.pieces[id][0] != 'bl' && this.pieces[id][0][1] == this.turn) {
        //Select first piece
        this.selectedPiece = id;
        this.mm.buildPossibleMoves(this.pieces, this.turn, this.selectedPiece);
        this.addHighlights();
      }
    } else if (this.mm.getPossibleMoves() != null && this.mm.getPossibleMoves().includes(id)) {
      //move piece on second click
      this.removeHighlights();
      this.pieces[id][0] = this.pieces[this.selectedPiece][0];
      this.pieces[this.selectedPiece][0] = 'bl';
      this.selectedPiece = null;
      this.switchTurn();
    } else {
      this.removeHighlights();
      this.selectedPiece = null;
    }
  }
 
  addHighlights(): void{
    if (this.mm.getPossibleMoves() == null) return;
    var i;
    for(i = 0; i < this.mm.getPossibleMoves().length; i ++){
      this.pieces[this.mm.getPossibleMoves()[i]][0] += 'h';
    }
  }
  removeHighlights(): void{
    if (this.mm.getPossibleMoves() == null) return;
    var i;
    for(i = 0; i < this.mm.getPossibleMoves().length; i++){
      this.pieces[this.mm.getPossibleMoves()[i]][0] = this.pieces[this.mm.getPossibleMoves()[i]][0].substring(0, this.pieces[this.mm.getPossibleMoves()[i]][0].length - 1);
    }
  }
  switchTurn(): void{
    if (this.turn == 'w'){
      this.turn = 'b';
    }else{
      this.turn = 'w';
    }
  }
}
