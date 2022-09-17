const game = {    
    tiles : Array.from(document.querySelectorAll('.tile')),
    playerDisplay : document.querySelector('.display-player'),   
    announcer : document.querySelector('.announcer'),
    currentPlayer : 'X',
    isGameActive : true,
    board : ['', '', '', '', '', '', '', '', ''],
    winningConditions : [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    
    boardOnClick : function(event)  {         
        const tile = event.target;       
        if(this.isValidAction(tile) && this.isGameActive) {
            tile.innerText = this.currentPlayer;
            tile.classList.add(`player${this.currentPlayer}`);
            this.updateBoard(event.target.id);
            this.displayResult();
            this.changePlayer();
        }
    },

    isValidAction : function(tile) {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    },

    updateBoard : function(index) {
        this.board[index] = this.currentPlayer;
    },

    displayResult : function() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = this.winningConditions[i];
            const a = this.board[winCondition[0]];            
            const b = this.board[winCondition[1]];
            const c = this.board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {            
            this.announcer.innerHTML =  (this.currentPlayer === 'X' ? 'Player <span class="playerX">X</span> Won' : 'Player <span class="playerO">O</span> Won');
            this.isGameActive = false;
            this.announcer.classList.remove('hide');
            return;
        }

        if (!this.board.includes('')){
            this.announcer.innerHTML = 'TIE';
            this.isGameActive = false;
            this.announcer.classList.remove('hide');
        }        
    },

    changePlayer : function() {       
        this.playerDisplay.classList.remove(`player${this.currentPlayer}`);
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';       
        this.playerDisplay.innerText = this.currentPlayer;
        this.playerDisplay.classList.add(`player${this.currentPlayer}`);
    },

    resetBoard : function() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.isGameActive = true;
        this.announcer.classList.add('hide');

        if (this.currentPlayer === 'O') {
            this.changePlayer();
        }

        this.tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });

        
    }
}