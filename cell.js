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

		fill(140);
		if (this.isRevealed) {
			fill(200);
		}
		rect(x, y, w, w);

		if (this.isMine && this.isRevealed) {
			fill(0);
			ellipse(x + w / 2, y + w / 2, w / 2, w / 2);
		}

		if (!this.isMine && this.isRevealed) {
			if (this.mineNeighbors > 0) {
				fill(0);
				textAlign(CENTER, CENTER);
				text(this.mineNeighbors, x + w / 2, y + w / 2);
			}
		}

		if (this.isFlagged) {
			fill(255, 0, 0);
			ellipse(x + w / 2, y + w / 2, w / 3, w / 3);
		}
	}
}
