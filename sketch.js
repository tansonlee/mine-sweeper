const rows = 20;
const cols = 20;
let w;
let board;

function setup() {
	createCanvas(401, 401);
	w = width / cols;
	board = new Board();
}

function draw() {
	board.show();
}

function mousePressed() {
	const index = indexFromXY(mouseX, mouseY);
	if (index) {
		board.reveal(index.i, index.j);
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
