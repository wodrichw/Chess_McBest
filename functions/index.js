const functions = require('firebase-functions');
const Chess = require('chess.js').Chess;
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.gameHandler = functions.database
    .ref('/activeGames/{hostId}').onWrite(event => {
        const preGameData = event.data.previous.val();
        const gameData = event.data.val();
        const chess = new Chess();
        if (gameData.functions == "untouched" && gameData.board == null) {//light type checking
            return event.data.ref.update({
                functions: "touched",
                board: chess.fen()
            });
        } else if (gameData.functions == "untouched" && gameData.move != preGameData.move) {
            chess.load(gameData.board);
            chess.move(gameData.move);
            return event.data.ref.update({
                functions: "touched",
                board: chess.fen(),
                gameOver: chess.game_over().toString()
            }).then(
                () => console.log(`its been fun scotty`));
        } else {
            console.log('dag nabbit');
        }
    });
