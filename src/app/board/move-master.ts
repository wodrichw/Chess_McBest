import { GeneralMoves } from './general-moves'
import { SpecialMoves } from './special-moves'

export class MoveMaster {
    //private selectedPiece: number;
    //private pieces: string[][];
    private possibleMoves: number[] = [];
    public gm: GeneralMoves = new GeneralMoves;
    private sm: SpecialMoves =new SpecialMoves;

    /*
    *Generate Possible Moves
    *This needs to ADD when a pawn is selected if there is an opportunity for Enpasant Set Enpasant pawn to null if it is value at the end of the turn
    *RESTRICT when a piece is in check
    *ADD when can castle
    *KNOW when a Pawn Promotion is necessary
    */
    buildPossibleMoves(pieces: string[][], turn: string, selectedPiece: number): void{
        //check and handle if in check
        this.sm.checkInCheck(pieces, turn);
        if (this.sm.getIncheck(turn) == true){
            if (this.sm.getInCheckMate(turn) == true){
                console.log(turn, "is in checkmate!");
            }else{
                if (pieces[selectedPiece][0][0] == 'k'){//only allows king to move out of check
                    this.possibleMoves = this.sm.getEscapeSquares(turn);
                    console.log('in check')
                }else{
                    this.possibleMoves = null;
                }
            }
            return;
        }
        //Build General Possible Moves
        this.possibleMoves = this.gm.buildPossibleMoves(pieces, selectedPiece);
        //Check For Castling moves if the selected pieces is a king
        if ( pieces[selectedPiece][0][0] == 'k'){
            this.sm.checkCastle(pieces, turn);
            if (this.sm.getCastleMoves(turn)){
                this.sm.getCastleMoves(turn).forEach(square => this.possibleMoves.push(square));
            }
        }
    }
    getPossibleMoves(){
        return this.possibleMoves;
    }
}
