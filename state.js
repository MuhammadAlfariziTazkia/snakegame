let snakeBody;
let currentDirection;
let foodCoord;

function init() {
    $("#arena").html(generateTable());

    // reset condition
    reset();
}

function gameStarted() {
    // hide play button
    $("#play-button").addClass("d-none");
    $("#score").text("Score: 0");
    
    // respawn snake
    snakeBody.push(respawn("SNAKE", getRandomNumber(5, 11), getRandomNumber(5, 11)));

    // respawn food
    foodCoord = respawnFood();

    // set initial direction
    currentDirection = DIRECTIONS[getRandomNumber(0, 3)];

    // change state to moving
    moving();
}

function moving() {
    const intervalId = setInterval(() => {
        // expand head
        const head = getSnakePartCord("HEAD");
        const nextMovement = calculateMovement(head);
        const vIndex = nextMovement.vIndex;
        const hIndex = nextMovement.hIndex;

        respawn("SNAKE", vIndex, hIndex);
        snakeBody.push({vIndex, hIndex});

        // eat
        if (isFoundFood(getSnakePartCord("HEAD"), foodCoord)) {
            foodCoord = respawnFood();
            score ++;
            $("#score").text("Score: " + score)
            return;
        }

        // remove tail
        const tail = getSnakePartCord("TAIL");
        respawn("CELL", tail.vIndex, tail.hIndex);
        snakeBody.shift();

        // die
        if (isDie()) {
            $("#play-button").removeClass("d-none");
            clearInterval(intervalId);
            init();
        }
    }, SPEED);
}

function die () {
    reset();
}