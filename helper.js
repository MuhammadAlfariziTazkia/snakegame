function generateTable () {
    let rows = "";
    for (let vIndex = 0 ; vIndex < 16 ; vIndex ++) {
        rows += "<tr>";
        for (let hIndex = 0 ; hIndex < 16 ; hIndex ++) {
            rows += `<td id="${vIndex}-${hIndex}"></td>`;
        }
        rows += "</tr>";
    }
    return rows;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function respawn(type, vIndex, hIndex) {
    const coord = {vIndex, hIndex};
    const cellId = `${vIndex}-${hIndex}`;
    $(`#${cellId}`).css("background", getCellColor(type));
    return coord;
}

function respawnFood () {
    let vIndex = getRandomNumber(0, 15);
    let hIndex = getRandomNumber(0, 15);
    while (isClashWithSnakeBody(vIndex, hIndex)) {
        vIndex = getRandomNumber(0, 15);
        hIndex = getRandomNumber(0, 15);
    }
    return respawn("FOOD", vIndex, hIndex);
}

function isClashWithSnakeBody (vIndex, hIndex) {
    for (let index = 0; index < snakeBody.length; index ++) {
        if (snakeBody[index].vIndex == vIndex && snakeBody[index].hIndex == hIndex) return true;
    }
    return false;
}

function getCellColor (type) {
    switch (type) {
        case "SNAKE": return snakeColor;
        case "FOOD": return foodColor;
        case "CELL": return cellColor;
    }
}

function isFoundFood(snakeHead, food) {
    return snakeHead.vIndex == food.vIndex 
        && snakeHead.hIndex == food.hIndex;
}

function getSnakePartCord(part) {
    const snakeIndex = part == "HEAD" ? snakeBody.length - 1 : 0;
    let vIndex = snakeBody[snakeIndex].vIndex;
    let hIndex = snakeBody[snakeIndex].hIndex;
    return {vIndex, hIndex};
}

function isDie () {
    const snakeHead = getSnakePartCord("HEAD");
    return isClashWithSnakeBody(snakeHead)
        || isSnakeHeadHitBorder(snakeHead);
}

function reset() {
    snakeBody = [];
    currentDirection = "";
    foodCoord = {};
    score = 0;
}

function isSnakeHeadHitBorder (snakeHead) {
    return snakeHead.vIndex > 15
        || snakeHead.vIndex < 0
        || snakeHead.hIndex > 15
        || snakeHead.hIndex < 0;
}