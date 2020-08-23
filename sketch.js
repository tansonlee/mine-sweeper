const rows = 20;
const cols = 20;
const mines = 50;
let w;
let board;

let revealedColour;
let helperToggle;

let flagImg;
let mineImg;

let helper = true;

function preload() {
	flagImg = loadImage("assets/flag.png");
	mineImg = loadImage("assets/mine.png");
}

function setup() {
	createCanvas(601, 601);
	revealedColour = color(17, 138, 178);
	helperToggle = createButton("toggle helper");
	helperToggle.mousePressed(() => (helper = !helper));

	w = floor(width / cols);
	board = new Board(rows, cols, mines);
	imageMode(CENTER);
	flagImg.resize(16, 25);
	mineImg.resize(25, 25);
}

function draw() {
	board.show(revealedColour);
	if (board.checkWin()) {
		board.winState();
	}

	if (board.checkLose()) {
		board.loseState();
	}

	if (helper) {
		const index = indexFromXY(mouseX, mouseY);
		if (index !== null) {
			const rectTop = (index.i - 1) * w;
			const rectLeft = (index.j - 1) * w;

			noFill();
			strokeWeight(2);
			stroke(255, 209, 102);
			rect(rectTop, rectLeft, w * 3, w * 3);
			stroke(0);
			strokeWeight(1);
		}
	}
}

function mousePressed() {
	const index = indexFromXY(mouseX, mouseY);
	if (index === null) {
		return;
	}

	if (mouseButton === RIGHT) {
		// add flag
		board.toggleFlag(index.i, index.j);
	} else {
		// reveal spot
		board.reveal(index.i, index.j);

		// check if spot is a mine
		if (board.state[index.i][index.j].isMine) {
			board.lose = true;
		}
	}
}

// returns the i, j index in the board.state array from an x, y location on the canvas
const indexFromXY = (x, y) => {
	const i = floor(x / w);
	const j = floor(y / w);

	if (i < 0 || i > rows - 1 || j < 0 || j > cols - 1) {
		return null;
	}
	return { i, j };
};

// prevent right-click from bringing up a context menu
document.oncontextmenu = () => {
	return false;
};
