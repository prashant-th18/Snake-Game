// Constants
let direction = { x: 0, y: 0 };
let speed = 5,
	score = 0;
let lastPaintTime = 0;
let snakeArray = [{ x: 13, y: 15 }]; // Contains the initial position of the snake
let food = { x: 4, y: 2 };
const board = document.querySelector("#board");
const showScore = document.querySelector("#score");
const showHighScore = document.querySelector("#highScore");
const maxHeight = 18;
const maxWidth = 18;

// Game Functions
const main = (ctime) => {
	// Request next frame, there
	requestAnimationFrame(main);
	// console.log(ctime); // ctime is the current time in milliseconds
	if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
		// Toh ab jb tk ctime aur lastPaintTime ke beech mai (1 / speed) time nhi lg jaata i.e. 0.5 seconds, tk screen re-render nhi hogi
		return;
	}
	lastPaintTime = ctime;
	gameEngine();
};
const isCollide = (sArr) => {
	for (let i = 1; i < sArr.length; ++i) {
		if (sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y) {
			return true;
		}
	}
	if (
		sArr[0].x > maxWidth ||
		sArr[0].x <= 0 ||
		sArr[0].y > maxHeight ||
		sArr[0].y <= 0
	) {
		return true;
	}
	return false;
};

const gameEngine = () => {
	// Part1: Updating the snake array

	// Collision
	if (isCollide(snakeArray)) {
		direction = { x: 0, y: 0 };
		alert("Game Over! Press any key to play again!");
		snakeArray = [{ x: 13, y: 15 }];
		score = 0;
		showScore.innerHTML = "Score:0";
	}

	// If snake has eaten the food
	if (food.x == snakeArray[0].x && food.y == snakeArray[0].y) {
		snakeArray.unshift({ x: food.x + direction.x, y: food.y + direction.y });
		let a = 2,
			b = 16;
		food = {
			x: Math.round(a + (b - a) * Math.random()),
			y: Math.round(a + (b - a) * Math.random()),
		};
		++score;
		if (score > highScoreVal) {
			highScoreVal = score;
			localStorage.setItem("highScore", JSON.stringify(highScoreVal));
			showHighScore.innerHTML = "High Score: " + highScoreVal;
		}
		showScore.innerHTML = "Score:" + score;
	}

	// Moving the snake
	for (let i = snakeArray.length - 1; i >= 1; --i) {
		snakeArray[i] = { ...snakeArray[i - 1] };
	}
	// For first element of snakeArray
	snakeArray[0].x += direction.x;
	snakeArray[0].y += direction.y;

	// Part2: Render the snake and food
	// Render the snake
	board.innerHTML = ""; // This is done so that pichla rendered snake ab show na ho
	snakeArray.forEach((e, index) => {
		let snakeElement = document.createElement("div");
		snakeElement.style.gridRowStart = e.y;
		snakeElement.style.gridColumnStart = e.x;
		if (index === 0) {
			snakeElement.classList.add("head");
		} else {
			snakeElement.classList.add("snake");
		}
		board.appendChild(snakeElement);
		// Kyuki mujhe pta hai ki mai snakeElement ko kisi grid mai lga rha hu, isliye
		/* snakeElement.style.gridRowStart = e.y;
		snakeElement.style.gridColumnStart = e.x; 
        hmne ye kra 
        ye basically ye bol rha hai ki is element ko board mai jb daaloge toh First row se itni aur first column se itni duri pr krna
        */
	});
	// Render the food
	let foodElement = document.createElement("div");
	foodElement.style.gridRowStart = food.y;
	foodElement.style.gridColumnStart = food.x;
	foodElement.classList.add("food");
	board.appendChild(foodElement);
};

// Main logic starts
let highScore = localStorage.getItem("highScore");
let highScoreVal = 0;
if (highScore === null) {
	localStorage.setItem("highScore", JSON.stringify(highScoreVal));
} else {
	highScoreVal = JSON.parse(highScore);
	showHighScore.innerHTML = "High Score:" + highScoreVal;
}

requestAnimationFrame(main);
// If I want to use some kind of animation, then I have to kind of reload the page. So for this, I can use the requestAnimationFrame function. This will do exactly what I want, and after reloading, it will call the main function.
window.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "ArrowUp":
			console.log("ArrowUp");
			direction.x = 0;
			direction.y = -1;
			break;
		case "ArrowDown":
			console.log("ArrowDown");
			direction.x = 0;
			direction.y = 1;
			break;
		case "ArrowLeft":
			console.log("ArrowLeft");
			direction.x = -1;
			direction.y = 0;
			break;
		case "ArrowRight":
			console.log("ArrowRight");
			direction.x = 1;
			direction.y = 0;
			break;
	}
});
