function isDie () {
    const snakeHead = getSnakePartCord("HEAD");
    
    if (isClashWithSnakeBody(snakeHead)) {
        $("#lose-description").text("Ouch! You just bit yourself!");
        return true;
    }

    if (isSnakeHeadHitBorder(snakeHead)) {
        $("#lose-description").text("Boom! You hit the wall!");
        return true;
    }

    return false;
}

function isSnakeHeadHitBorder (snakeHead) {
    return snakeHead.vIndex > MAX_COORD
        || snakeHead.vIndex < MIN_COORD
        || snakeHead.hIndex > MAX_COORD
        || snakeHead.hIndex < MIN_COORD;
}

function isClashWithSnakeBody (snakeHead) {
    for (let index = 0; index < snakeBody.length-1; index ++) {
        if (snakeBody.length <= 1) return false;
        if (
            snakeBody[index].vIndex == snakeHead.vIndex && 
            snakeBody[index].hIndex == snakeHead.hIndex
        ) return true;
    }
    return false;
}