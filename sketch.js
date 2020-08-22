const rows = 20;
const cols = 20;
const mines = 60;
let w;
let board;

function setup() {
	createCanvas(601, 601);
	w = floor(width / cols);
	board = new Board(rows, cols, mines);
}

function draw() {
	background(255);
	board.show();
	if (board.checkWin()) {
		board.winState();
	}

	if (board.checkLose()) {
		board.loseState();
	}
}

function mousePressed() {
	const index = indexFromXY(mouseX, mouseY);
	if (mouseButton === RIGHT) {
		if (index) {
			board.toggleFlag(index.i, index.j);
		}
	} else {
		if (index) {
			board.reveal(index.i, index.j);
		}

		if (board.state[index.i][index.j].isMine) {
			board.lose = true;
		}
	}
}

const indexFromXY = (x, y) => {
	const i = floor(x / w);
	const j = floor(y / w);

	if (i < 0 || i > rows || j < 0 || j > cols) {
		return null;
	}
	return { i, j };
};

// prevent right-click from bringing up a context menu
document.oncontextmenu = () => {
	return false;
};
