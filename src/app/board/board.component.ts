import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnChanges {
  selectedPiece: number;
  pieces: string[];
  fenPieces: string;
  gameObservable: any;
  hostUid: string;
  turn: string;

  @Input()
  set setGameObservable(hostUid: string) {
    //get the key for the game in the database that this game is referencing, then set an observable to see changes game on database
    this.hostUid = hostUid;
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      //this.hostUid = cur;
      console.log(`current value ${chng.currentValue}`);
      this.hostUid = chng.currentValue;
      let prev = JSON.stringify(chng.previousValue);
    }
    if (this.hostUid != null) {
      // this.gameObservable = this.db.object('activeGames/' + this.hostUid, { preserveSnapshot: true });
      this.gameObservable.subscribe(snap => {
        if (snap.val() != null) {
          this.fenPieces = snap.val().board;
          this.structureBoard();
        }
      });
    }
  }
  onPieceToggle(event): void {
    this.move(event);
  }

  structureBoard() {
    if (this.fenPieces != null) {
      this.setPiecesFromFen();
      this.getTurn();
    }
  }
  getTurn() {
    this.turn = this.fenPieces[this.fenPieces.indexOf(' ') + 1];
  }
  setPiecesFromFen() {
    let i: number = 0;
    let k: number = 0;
    let color: string;
    let piece: string;
    let pieces: string[] = [];

    function getNum(num: any): number {
      if (isNaN(num)) {
        return 0;
      } else {
        return num;
      }
    }
    function getColor(piece: string): string {
      if (piece.toUpperCase() == piece) {
        return 'w';
      } else {
        return 'b';
      }
    }

    for (i; i < this.fenPieces.length; i++) {
      if (this.fenPieces[i] == ' ') {
        break;
      }
      if (this.fenPieces[i] != '/') {
        if (getNum(this.fenPieces[i])) {
          let l: number = 0;
          for (l; l < getNum(this.fenPieces[i]); l++) {
            pieces.push('bl');
          }
        } else {
          color = getColor(this.fenPieces[i]);
          piece = this.fenPieces[i].toLowerCase();
          pieces.push(piece + color);
        }
      }
    }
    this.pieces = pieces;
  }

  move(id: number): void {
    function getAlgebraic(id: number): string {
      function getLetter(id: number): string {
        switch (id % 8) {
          case 0:
            return 'a';
          case 1:
            return 'b';
          case 2:
            return 'c';
          case 3:
            return 'd';
          case 4:
            return 'e';
          case 5:
            return 'f';
          case 6:
            return 'g';
          case 7:
            return 'h';
        }
      }
      return getLetter(id) + Math.abs(Math.floor(id / 8) - 8);
    }
    if (this.selectedPiece == null) {
      if (this.pieces[id] !== 'bl' && this.pieces[id][1] === this.turn) {
        this.selectedPiece = id;
        this.pieces[id] += 'h';
      }
    }
  }

  addHighlights(): void {
    /*
    if (this.mm.getPossibleMoves() == null) return;
    var i;
    for(i = 0; i < this.mm.getPossibleMoves().length; i ++){
      this.pieces[this.mm.getPossibleMoves()[i]][0] += 'h';
    }
    */
  }
  removeHighlights(): void {
    /*
    if (this.mm.getPossibleMoves() == null) return;
    var i;
    for(i = 0; i < this.mm.getPossibleMoves().length; i++){
      this.pieces[this.mm.getPossibleMoves()[i]][0] = this.pieces[this.mm.getPossibleMoves()[i]][0].substring(0, this.pieces[this.mm.getPossibleMoves()[i]][0].length - 1);
    }
    */
  }
}
