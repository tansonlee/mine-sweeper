const rows = 20;
const cols = 20;
let w;
let board;

function setup() {
	createCanvas(601, 601);
	w = width / cols;
	board = new Board();
}

function draw() {
	board.show();
	board.checkWin();
}

function mousePressed() {
	const index = indexFromXY(mouseX, mouseY);
	if (keyIsDown(32)) {
		if (index) {
			board.toggleFlag(index.i, index.j);
		}
	} else {
		if (index) {
			board.reveal(index.i, index.j);
		}

		if (board.state[index.i][index.j].isMine) {
			board.revealAll();
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
