class Board {
	constructor() {
		this.state = [];
		this.fillCells();
		this.distributeMines(40);
		this.fillCellNeighborValues();
	}

	fillCells() {
		this.state = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

		for (let i = 0; i < this.state.length; i++) {
			for (let j = 0; j < this.state[i].length; j++) {
				const cell = new Cell(i, j);
				this.state[i][j] = cell;
			}
		}
	}

	show() {
		for (let i = 0; i < this.state.length; i++) {
			for (let j = 0; j < this.state[i].length; j++) {
				this.state[i][j].show();
			}
		}
	}

	fillCellNeighborValues() {
		for (let i = 0; i < this.state.length; i++) {
			for (let j = 0; j < this.state[i].length; j++) {
				let mines = 0;
				// top
				if (j > 0) {
					if (this.state[i][j - 1].isMine) {
						mines++;
					}
				}
				// right
				if (i < rows - 1) {
					if (this.state[i + 1][j].isMine) {
						mines++;
					}
				}
				// bottom
				if (j < cols - 1) {
					if (this.state[i][j + 1].isMine) {
						mines++;
					}
				}
				// left
				if (i > 0) {
					if (this.state[i - 1][j].isMine) {
						mines++;
					}
				}

				// top left
				if (i > 0 && j > 0) {
					if (this.state[i - 1][j - 1].isMine) {
						mines++;
					}
				}
				// top right
				if (i < cols - 1 && j > 0) {
					if (this.state[i + 1][j - 1].isMine) {
						mines++;
					}
				}
				// bottom right
				if (i < cols - 1 && j < rows - 1) {
					if (this.state[i + 1][j + 1].isMine) {
						mines++;
					}
				}

				// bottom right
				if (i > 0 && j < cols - 1) {
					if (this.state[i - 1][j + 1].isMine) {
						mines++;
					}
				}
				this.state[i][j].mineNeighbors = mines;
			}
		}
	}

	distributeMines(num) {
		if (num > this.state.length * this.state[0].length || num < 0) {
			return "invalid number";
		}
		const possibilities = [];

		for (let i = 0; i < this.state.length; i++) {
			for (let j = 0; j < this.state[i].length; j++) {
				possibilities.push({ i, j });
			}
		}

		for (let i = 0; i < num; i++) {
			const randCell = random(possibilities);
			this.state[randCell.i][randCell.j].isMine = true;

			// remove from array
			const index = possibilities.indexOf(randCell);
			if (index > -1) {
				possibilities.splice(index, 1);
			}
		}
	}

	reveal(i, j) {
		if (this.state[i][j].isRevealed) {
			return;
		}
		this.state[i][j].isRevealed = true;
		if (this.state[i][j].mineNeighbors === 0) {
			// top
			if (j > 0) {
				this.recursiveReveal(i, j - 1);
			}

			// right
			if (i < cols - 1) {
				this.recursiveReveal(i + 1, j);
			}

			// bottom
			if (j < rows - 1) {
				this.recursiveReveal(i, j + 1);
			}

			// left
			if (i > 0) {
				this.recursiveReveal(i - 1, j);
			}
		}
	}

	recursiveReveal(i, j) {
		const cell = this.state[i][j];
		if (!cell.isMine) {
			if (cell.mineNeighbors === 0) {
				this.reveal(i, j);
			}

			cell.isRevealed = true;
		}
	}

	revealAll() {
		for (let i = 0; i < this.state.length; i++) {
			for (let j = 0; j < this.state[i].length; j++) {
				this.state[i][j].isRevealed = true;
			}
		}
	}

	toggleFlag(i, j) {
		this.state[i][j].isFlagged = !this.state[i][j].isFlagged;
	}

	checkWin() {
		let revealed = 0;
		for (let i = 0; i < this.state.length; i++) {
			for (let j = 0; j < this.state[i].length; j++) {
				if (this.state[i][j].isRevealed) {
					revealed++;
				}
			}
		}
		if (revealed === 400 - 40) {
			console.log("win");
		}
	}
}
