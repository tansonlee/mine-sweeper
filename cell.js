class Cell {
	constructor(i, j) {
		this.isRevealed = false;
		this.isMine = false;
		this.isFlagged = false;
		this.index = { i, j };
		this.mineNeighbors = 0;
	}

	show(isDarkMode, mineColor) {
		const x = this.index.i * w;
		const y = this.index.j * w;

		// drawing the background rectangle
		if (isDarkMode) {
			if (this.isRevealed) {
				fill(17, 138, 178);
			} else {
				fill(7, 59, 76);
			}
		} else {
			if (this.isRevealed) {
				fill(200);
			} else {
				fill(140);
			}
		}
		if (this.isMine && this.isRevealed) {
			fill(mineColor);
		}
		rect(x, y, w, w);

		// drawing a mine
		if (this.isMine && this.isRevealed) {
			image(mineImg, x + w / 2, y + w / 2);
		}

		// drawing the number
		if (!this.isMine && this.isRevealed) {
			if (this.mineNeighbors > 0) {
				fill(0);
				noStroke();
				textAlign(CENTER, CENTER);
				text(this.mineNeighbors, x + w / 2, y + w / 2);
				stroke(0);
			}
		}

		// drawing the flag
		if (this.isFlagged) {
			image(flagImg, x + w / 2, y + w / 2);
		}
	}
}
