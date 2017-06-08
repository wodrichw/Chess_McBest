export class GeneralMoves {
    private selectedPiece: number;
    private pieces: string[][];
    private possibleMoves: number[];


    /* ********Big Kahuna Functions*************************** */
    buildPossibleMoves(pieces: string[][], selectedPiece: number): number[]{
        this.setSelectedPiece(selectedPiece);
        this.setPossibleMovesToNull();
        this.setPieces(pieces);
        this.searchPossibleMoves();
        return this.possibleMoves;
    }
    
    /* *******Functions for Generatign Possible Moves********** */
    searchPossibleMoves(): void {
        switch (this.pieces[this.selectedPiece][0][0]) {
            case 'p':
                this.pawnMoves();
                break;
            case 'r':
                this.rookMoves();
                break;
            case 'n':
                this.knightMoves();
                break;
            case 'b':
                this.bishopMoves();
                break;
            case 'q':
                this.queenMoves();
                break;
            case 'k':
                this.kingMoves();
                break;
        }
    }

    pawnMoves(): void {
        var opColor = this.getOpColor(this.selectedPiece);
        var foreward = (opColor == 'w' ? 1 : -1);

        var possibleSquares = [
            [this.selectedPiece + 16 * foreward, 'l'],
            [this.selectedPiece + 8 * foreward, 'l'],
            [this.selectedPiece + 8 * foreward + 1, opColor],
            [this.selectedPiece + 8 * foreward - 1, opColor]
        ];

        var i = 1
        if (opColor == 'b' && this.selectedPiece >= 48 && this.selectedPiece <= 55) {
            i = 0;
        } else if (opColor == 'w' && this.selectedPiece >= 8 && this.selectedPiece <= 15) {
            i = 0;
        }

        for (i; i < possibleSquares.length; i++) {
            if (this.checkSquare(possibleSquares[i][0], [possibleSquares[i][1]])) {
                this.addMove(possibleSquares[i][0]);
            }
        }
        //console.log("possible moves:", this.possibleMoves);
    }

    rookMoves(): void {
        this.movementLogic(1, 0)
        this.movementLogic(-1, 0);
        this.movementLogic(0, 1);
        this.movementLogic(0, -1);
    }
    knightMoves(): void {
        var opColor = this.getOpColor(this.selectedPiece);
        var position = this.to2D(this.selectedPiece);
        var possibleSquares = [
            [2, 1],
            [2, -1],
            [1, 2],
            [1, -2],
            [-2, 1],
            [-2, -1],
            [-1, 2],
            [-1, -2],
        ];
        var i = 0;
        var xval, yval;
        for (i; i < possibleSquares.length; i++) {
            xval = possibleSquares[i][0] + position[0];
            yval = possibleSquares[i][1] + position[1];
            if (this.checkSquare(this.to1D(xval, yval), [opColor, 'l'])) {
                if (xval >= 0 && xval <= 7 && yval >= 0 && yval <= 7) {
                    this.addMove(this.to1D(xval, yval));
                }
            }
        }
    }
    bishopMoves(): void {
        this.movementLogic(1, 1);
        this.movementLogic(1, -1);
        this.movementLogic(-1, -1);
        this.movementLogic(-1, 1);
    }
    queenMoves(): void {
        this.movementLogic(1, 0)
        this.movementLogic(-1, 0);
        this.movementLogic(0, 1);
        this.movementLogic(0, -1);
        this.movementLogic(1, 1);
        this.movementLogic(1, -1);
        this.movementLogic(-1, -1);
        this.movementLogic(-1, 1);
    }
    kingMoves(): void {
        this.movementLogic(1, 0)
        this.movementLogic(-1, 0);
        this.movementLogic(0, 1);
        this.movementLogic(0, -1);
        this.movementLogic(1, 1);
        this.movementLogic(1, -1);
        this.movementLogic(-1, -1);
        this.movementLogic(-1, 1);
    }

    movementLogic(goX: number, goY: number): void {
        var opColor = this.getOpColor(this.selectedPiece);
        var posX = this.to2D(this.selectedPiece)[0] + goX;
        var posY = this.to2D(this.selectedPiece)[1] + goY;

        while (posX >= 0 && posX <= 7 && posY >= 0 && posY <= 7) {
            if (this.pieces[this.to1D(posX, posY)][0] == 'bl') {
                this.addMove(this.to1D(posX, posY));
                if (this.pieces[this.selectedPiece][0][0] == 'k') {
                    break;
                }
            } else if (this.pieces[this.to1D(posX, posY)][0][1] == opColor) {
                this.addMove(this.to1D(posX, posY));
                break;
            } else {
                break;
            }
            posX += goX;
            posY += goY;
        }
    }

    checkSquare(location: number, validSquares: string[]): any {
        var i;
        if (!(location >= 0 && location <= 63)) {
            return false;
        }
        for (i = 0; i < validSquares.length; i++) {
            if (this.pieces[location][0][1] == validSquares[i]) {
                return true;
            }
        }
        return false;
    }
    to2D(location: number): number[] {
        return ([location % 8, Math.floor(location / 8)]);
    }
    to1D(x: number, y: number): number {
        return (8 * y + x);
    }

    addMove(location: number): void {
        if (this.possibleMoves == null) {
            this.possibleMoves = [location]
        } else {
            this.possibleMoves.push(location);
        }
    }
    getOpColor(location: number): any {
        if (this.pieces[location][0][1] == 'b') {
            return 'w';
        } else {
            return 'b';
        }
    }



    /* **********Functions for Interacting with possible moves data********** */
    setPossibleMovesToNull(): void{
        this.possibleMoves = null;
    }
    setPieces(pieces: string[][]){
        this.pieces = pieces;
    }
    getPossibleMoves(): number[]{
        return this.possibleMoves;
    }
    setSelectedPiece(piece: number): void{
        this.selectedPiece = piece;
    }
}
