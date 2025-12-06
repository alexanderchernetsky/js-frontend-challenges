import Event from '../Event';

class TicTacToeModel {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X'; // or 'O'
        this.gameFinished = false;

        // events
        this.updateCellEvent = new Event();
        this.victoryEvent = new Event();
        this.drawEvent = new Event();
    }

    play(position) {
        // check if game is finished
        if (this.gameFinished) {
            return false;
        }

        // update board data
        this.board[position] = this.currentPlayer;
        // notify view
        this.updateCellEvent.trigger({position, player: this.currentPlayer});

        this.gameFinished = this.victory() || this.draw();

        // switch player
        if (!this.gameFinished) {
            this.switchPlayer();
        }

        return true;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    draw() {
        // all cells are filled
        const draw = this.board.every(cell => cell !== null);

        if (draw) {
            this.drawEvent.trigger();
        }

        return draw;
    }

    victory() {
        // return winner if any
        // check for winning combinations:
        // 0 1 2
        // 3 4 5
        // 6 7 8
        let victory = false;

        for (let i = 0; i <= 8; i++) {
            // horizontal
            if (i % 3 === 0 && this.board[i] === this.board[i + 1] && this.board[i + 1] === this.board[i + 2] && this.board[i] !== null) {
                victory = true;
            }
            // vertical
            if (this.board[i] === this.board[i + 3] && this.board[i + 3] === this.board[i + 6] && this.board[i] !== null) {
                victory = true;
            }
            // diagonal
            if (this.board[i] === this.board[i + 4] && this.board[i + 4] === this.board[i + 8] && this.board[i] !== null) {
                victory = true;
            }
            // diagonal in opposite direction
            if (i !== 0 && i % 2 === 0 && this.board[i] === this.board[i + 2] && this.board[i + 2] === this.board[i + 4] && this.board[i] !== null) {
                victory = true;
            }
        }

        if (victory) {
            this.victoryEvent.trigger(this.currentPlayer);
            return this.currentPlayer;
        }

        return false;
    }
}

export default TicTacToeModel;
