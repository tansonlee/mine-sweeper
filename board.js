class Board {
	constructor(rows, cols, mines) {
		this.state = [];
		this.rows = rows;
		this.cols = cols;
		this.mines = mines;
		this.fillCells();
		this.distributeMines(mines);
		this.fillCellNeighborValues();
		this.lose = false;
	}

	fillCells() {
		this.state = new Array(this.rows)
			.fill(0)
			.map(() => new Array(this.cols).fill(0));

		for (let i = 0; i < this.state.length; i++) {
			for (let j = 0; j < this.state[i].length; j++) {
				const cell = new Cell(i, j);
				this.state[i][j] = cell;
			}
		}
	}

	show(isDarkMode, mineColor) {
		for (let i = 0; i < this.state.length; i++) {
			for (let j = 0; j < this.state[i].length; j++) {
				this.state[i][j].show(isDarkMode, mineColor);
			}
		}
	}

	winState(isDarkMode) {
		noLoop();
		this.revealAll();
		if (isDarkMode) {
			this.show(isDarkMode, color(6, 214, 160));
		} else {
			this.show(isDarkMode, color(0, 255, 0));
		}
	}

	loseState(isDarkMode) {
		noLoop();
		this.revealAll();
		if (isDarkMode) {
			this.show(isDarkMode, color(239, 71, 111));
		} else {
			this.show(isDarkMode, color(255, 0, 0));
		}
	}

	normalState(isDarkMode) {
		this.show(isDarkMode, color(255, 255, 255));
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

			// top left
			if (i > 0 && j > 0) {
				this.recursiveReveal(i - 1, j - 1);
			}
			// top right
			if (i < cols - 1 && j > 0) {
				this.recursiveReveal(i + 1, j - 1);
			}
			// bottom right
			if (i < cols - 1 && j < rows - 1) {
				this.recursiveReveal(i + 1, j + 1);
			}

			// bottom right
			if (i > 0 && j < cols - 1) {
				this.recursiveReveal(i - 1, j + 1);
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
		if (revealed === 400 - this.mines) {
			return true;
		}
		return false;
	}

	checkLose() {
		return this.lose;
	}
}
