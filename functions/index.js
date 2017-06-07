const functions = require('firebase-functions');
const Chess = require('chess.js').Chess;
const chess = new Chess();

exports.generateGame = functions.database
    .ref('/activeGames/{hostId}').onWrite(event => {
        const gameData = event.data.val();
        const chess = new Chess();
        if (gameData.functions == "untouched") {//light type checking
            return event.data.ref.update({
                functions: "touched",
                board: chess.ascii()
            });
        }
    });