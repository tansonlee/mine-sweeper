class Cell {
	constructor(i, j) {
		this.isRevealed = false;
		this.isMine = false;
		this.isFlagged = false;
		this.index = { i, j };
		this.mineNeighbors = 0;
	}

	show() {
		const x = this.index.i * w;
		const y = this.index.j * w;

		fill(7, 59, 76);
		if (this.isRevealed) {
			fill(17, 138, 178);
		}
		rect(x, y, w, w);

		if (this.isMine && this.isRevealed) {
			image(mineImg, x + w / 2, y + w / 2);
		}

		if (!this.isMine && this.isRevealed) {
			if (this.mineNeighbors > 0) {
				fill(0);
				noStroke();
				textAlign(CENTER, CENTER);
				text(this.mineNeighbors, x + w / 2, y + w / 2);
				stroke(0);
			}
		}

		if (this.isFlagged) {
			image(flagImg, x + w / 2, y + w / 2);
		}
	}

	showWin() {
		const x = this.index.i * w;
		const y = this.index.j * w;

		fill(7, 59, 76);
		if (this.isRevealed) {
			fill(17, 138, 178);
		}
		if (this.isMine) {
			fill(6, 214, 160);
		}
		rect(x, y, w, w);

		if (this.isMine && this.isRevealed) {
			image(mineImg, x + w / 2, y + w / 2);
		}

		if (!this.isMine && this.isRevealed) {
			if (this.mineNeighbors > 0) {
				fill(0);
				noStroke();
				textAlign(CENTER, CENTER);
				text(this.mineNeighbors, x + w / 2, y + w / 2);
				stroke(0);
			}
		}

		if (this.isFlagged) {
			image(flagImg, x + w / 2, y + w / 2);
		}
	}

	showLose() {
		const x = this.index.i * w;
		const y = this.index.j * w;

		fill(7, 59, 76);
		if (this.isRevealed) {
			fill(17, 138, 178);
		}
		if (this.isMine) {
			fill(239, 71, 111);
		}
		rect(x, y, w, w);

		if (this.isMine && this.isRevealed) {
			image(mineImg, x + w / 2, y + w / 2);
		}

		if (!this.isMine && this.isRevealed) {
			if (this.mineNeighbors > 0) {
				fill(0);
				noStroke();
				textAlign(CENTER, CENTER);
				text(this.mineNeighbors, x + w / 2, y + w / 2);
				stroke(0);
			}
		}

		if (this.isFlagged) {
			image(flagImg, x + w / 2, y + w / 2);
		}
	}
}
