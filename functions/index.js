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
                board: chess.fen()
            }).then(
                () => console.log(`its been fun scotty`));
        } else {
            console.log('dag nabbit');
        }
    });
/*
exports.moveHandler = functions.database
    .ref('activeGames/{hostId}/move').onWrite(event => {
        admin.database().ref(`/activeGames/${event.params.hostId}`).val()
        var functions = event.data.ref.parent.child('functions').val();
        if (functions == "untouched") {
            var board = event.data.ref.parent.child('board').val();
            var move = event.data.val();
            chess.load(board);
            chess.move('{' + move + '}');
            if (board != chess.fen()) {
                return event.data.ref.parent.update({
                    functions: "touched",
                    board: chess.fen()
                });
            } else {
                return;
            }
        }
    });

exports.touch = functions.database.ref('/chat/{message}').onWrite(
event => admin.database().ref('/lastmodified').set(event.timestamp));
*/