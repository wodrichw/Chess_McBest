import { GeneralMoves } from './general-moves'

export class SpecialMoves {
    /* ******Move Data Object********** */
    gm: GeneralMoves = new GeneralMoves;

    /* ******Castling Data************* */
    //Has Castled
    private wHasCastled: boolean = false;
    private bHasCastled: boolean = false;

    //Can Castle
    private wCastleLeft: boolean = false;
    private wCastleRight: boolean = false;
    private bCastleLeft: boolean = false;
    private bCastleRight: boolean = false;
    //Rook Moved
    private wRookRightMoved: boolean = false;
    private wRookLeftMoved: boolean = false;
    private bRookRightMoved: boolean = false;
    private bRookLeftMoved: boolean = false;
    //King Moved
    private wKingMoved: boolean = false;
    private bKingMoved: boolean = false;

    /* ********En Pasant Data********* */
    private wVulnurablePawn: number;
    private bVulnurablePawn: number;

    /* *******In Check Data************ */
    private wInCheck: boolean = false;
    private bInCheck: boolean = false;

    /* *******Pawn Promotion Data****** */
    private wPawnToPromote: number;
    private bPawnToPromote: number;

    /* *******CheckMate Data************ */
    private wInCheckMate: boolean = false;
    private bInCheckMate: boolean = false;
    private wEscapeSquares: number[];
    private bEscapeSquares: number[];



    /* ********Get Functions************** */
    getIncheck(turn: string): boolean {
        if (turn == 'w') {
            return this.wInCheck;
        } else {
            return this.bInCheck;
        }
    }
    getInCheckMate(turn: string): boolean {
        if (turn == 'w'){
            return this.wInCheckMate;
        }else{
            return this.bInCheckMate;
        }
    }
    getEscapeSquares(turn: string): number[]{
        if (turn == 'w'){
            return this.wEscapeSquares;
        }else{
            return this.bEscapeSquares;
        }
    }

    /* *********Castling Functions******* *//* ***************************** I need to check if there is any offending pieces******* */
    checkCastle(pieces: string[][], turn: string): void {
        if (turn === 'w') {
            if (this.wHasCastled === true) {
                return;
            }
            if (this.wKingMoved === false) {
                if (this.wRookLeftMoved === false && pieces[58][0] === 'bl' && pieces[57][0] === 'bl') {
                    this.wCastleLeft = true;
                }
                if (this.wRookRightMoved === false && pieces[61][0] === 'bl' && pieces[62][0] === 'bl') {
                    this.wCastleRight = true;
                }
            }

        }
        if (turn === 'b') {
            if (this.bHasCastled === true) {
                return;
            }
            if (this.bKingMoved === false) {
                if (this.bRookLeftMoved === false && pieces[1][0] === 'bl' && pieces[2][0] === 'bl') {
                    this.bCastleLeft = true;
                }
                if (this.bRookRightMoved === false && pieces[5][0] === 'bl' && pieces[6][0] === 'bl') {
                    this.bCastleRight = true;
                }
            }
        }

    }
    setHasCastled(turn: string) {
        if (turn === 'w') {
            this.wHasCastled = true;
        } else {
            this.bHasCastled = true;
        }
    }
    getHasCastled(turn: string): boolean {
        if (turn === 'w') {
            return this.wHasCastled;
        } else {
            return this.bHasCastled;
        }
    }
    getCanCastle(turn: string): boolean[] {
        if (turn === 'w') {
            return [this.wCastleRight, this.wCastleLeft];
        } else {
            return [this.bCastleRight, this.bCastleLeft];
        }
    }
    getCastleMoves(turn: string): number[]{
        if (turn == 'w'){
            if (this.wCastleRight && this.wCastleLeft) return [57, 62];
            if (this.wCastleRight) return [62];
            if (this.wCastleLeft) return [57];
        }else{
            if (this.wCastleRight && this.wCastleLeft) return [1, 6];
            if (this.wCastleRight) return [1];
            if (this.wCastleLeft) return [6];
        }
        return null;
    }
    setRookMoved(pieces: string[][]): void {
        if (pieces[56][0][0] != 'r') {
            this.wRookLeftMoved = true;
        }
        if (pieces[63][0][0] != 'r') {
            this.wRookRightMoved = true;
        }
        if (pieces[7][0][0] != 'r') {
            this.wRookRightMoved = true;
        }
        if (pieces[0][0][0] != 'r') {
            this.wRookLeftMoved = true;
        }
    }
    setKingMoved(pieces: string[][]): void {
        if (pieces[60][0][0] != 'k') {
            this.wKingMoved = true;
        }
        if (pieces[4][0][0] != 'k') {
            this.bKingMoved = true;
        }
    }

    /* ********En Pasant Functions***************** */
    setEnpasant(location: number): void {
        if (location >= 24 && location <= 31) {//where black double pawns would be
            this.bVulnurablePawn = location;
        } else {
            this.wVulnurablePawn = location;
        }
    }
    getEnpasantData(turn: string): number[] {
        if (turn === 'w') {
            return [this.bVulnurablePawn, this.bVulnurablePawn - 8];
        } else {
            return [this.wVulnurablePawn, this.wVulnurablePawn + 8];
        }
    }

    /* *********Check Functions********************* */

    checkInCheck(pieces: string[][], turn: string): void {
        //find the king
        var i = 0;
        var king: number;
        for (i; i < pieces.length; i++) {
            if (pieces[i][0] == 'k' + turn) {
                king = i;
                break;
            }
        }

        if (this.underAttack(pieces, king, turn)) {
            if (turn === 'w') {
                this.wInCheck = true;
            } else {
                this.bInCheck = true;
            }
            this.findEscape(pieces, king);
        }
    }
    findEscape(pieces: string[][], king: number): void {
        //set EscapeSquares to null
        this.wEscapeSquares = null;
        this.bEscapeSquares = null;
        //get king color and opposing color and 2D king position
        var turn;
        turn = pieces[king][0][1];
        var opColor = this.getOpColor(turn);
        var pos = this.gm.to2D(king);
        //find open spaces around the king
        var adjSquares = [
            [pos[0] - 1, pos[1] + 1],
            [pos[0], pos[1] + 1],
            [pos[0] + 1, pos[1] + 1],
            [pos[0] - 1, pos[1]],
            [pos[0] + 1, pos[1]],
            [pos[0] - 1, pos[1] - 1],
            [pos[0], pos[1] - 1],
            [pos[0] + 1, pos[1] - 1]
        ];
        var i;
        for (i = 0; i < adjSquares.length; i++) {
            if (adjSquares[i][0] >= 0 && adjSquares[i][0] <= 7 && adjSquares[i][1] >= 0 && adjSquares[i][1] <= 7) {
                if (pieces[this.gm.to1D(adjSquares[i][0], adjSquares[i][1])][0] == 'bl') {
                    if (!this.underAttack(pieces, this.gm.to1D(adjSquares[i][0], adjSquares[i][1]), turn)) {
                        this.addEscapeSquare(this.gm.to1D(adjSquares[i][0], adjSquares[i][1]), turn);
                    }
                }
            }
        }
        this.CheckCheckMate(turn);
    }
    addEscapeSquare(square: number, turn: string) {
        if (turn == 'w') {
            if (this.wEscapeSquares == null) {
                this.wEscapeSquares = [square];
            } else {
                this.wEscapeSquares.push(square);
            }
        } else {
            if (this.bEscapeSquares == null) {
                this.bEscapeSquares = [square];
            } else {
                this.bEscapeSquares.push(square);
            }
        }
    }
    underAttack(pieces: string[][], square: number, turn: string): boolean {
        var i;
        for (i= 0; i < pieces.length; i++) {
            if (pieces[i][0][1] == this.getOpColor(turn)) {
                this.gm.buildPossibleMoves(pieces, i);
                if (this.gm.getPossibleMoves() != null && this.gm.getPossibleMoves().includes(square)) {
                    return true;
                }
            }
        }
        return false;
    }
    CheckCheckMate(turn: string): void {
        if (turn == 'w') {
            if (this.wEscapeSquares == null) {
                this.wInCheckMate = true;
            }
        } else {
            if (this.bEscapeSquares == null) {
                this.bInCheckMate = true;
            }
        }
    }


    getOpColor(turn: string): string {
        if (turn == 'w') {
            return 'b'
        } else {
            return 'w'
        }
    }

    /* **************Pawn Promotion Functions******************* */
    checkEligablePawns(pieces: string[][], turn: string) {
        var i;
        if (turn == 'w') {
            this.wPawnToPromote = null;
            for (i = 0; i <= 7; i++) {
                if (pieces[i][0] == 'pw') {
                    this.wPawnToPromote = i;
                }
            }
        } else {
            this.bPawnToPromote = null;
            for (i = 56; i <= 63; i++) {
                if (pieces[i][0] == 'pb') {
                    this.bPawnToPromote = i;
                }
            }
        }
    }

}
