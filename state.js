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
    $("#playButton").addClass("d-none");
    $("#score").text("Score: 0");
    
    // respawn snake
    snakeBody.push(respawn("SNAKE", getRandomNumber(5, 11), getRandomNumber(5, 11)));

    // respawn food
    foodCoord = respawnFood();

    // set initial direction
    currentDirection = directions[getRandomNumber(0, 3)];
    
    // change state to moving
    moving();
}

function moving() {
    const intervalId = setInterval(() => {
        // expand head
        const head = getSnakePartCord("HEAD");
        let vIndex = head.vIndex;
        let hIndex = head.hIndex;
        switch (currentDirection) {
            case "UP":
                vIndex--;
                break;
            case "BOTTOM":
                vIndex++;
                break;
            case "RIGHT":
                hIndex++;
                break;
            case "LEFT":
                hIndex--;
                break;
        }
        respawn("SNAKE", vIndex, hIndex);
        snakeBody.push({vIndex, hIndex});

        // eat
        if (isFoundFood(getSnakePartCord("HEAD"), foodCoord)) {
            foodCoord = respawnFood();
            score ++;
            $("#score").text("Score: " + score)
            return;
        }

        // die
        if (isDie()) {
            $("#playButton").removeClass("d-none");
            clearInterval(intervalId);
            init();
        }

        // remove tail
        const tail = getSnakePartCord("TAIL");
        respawn("CELL", tail.vIndex, tail.hIndex);
        snakeBody.shift();
    }, 250);
}

function die () {
    reset();
}