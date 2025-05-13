function generateTable () {
    let rows = "";
    for (let vIndex = MIN_COORD ; vIndex < MAX_COORD + 1 ; vIndex ++) {
        rows += "<tr>";
        for (let hIndex = MIN_COORD ; hIndex < MAX_COORD + 1 ; hIndex ++) {
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
    const cell = $(`#${cellId}`);
    adjustCellDisplay(type, cell);
    return coord;
}

function adjustCellDisplay(type, cell) {
    cell.removeClass();
    switch (type) {
        case "SNAKE": 
            cell.addClass('snake-body');
            break;
        case "FOOD": 
            cell.addClass('food');
            break;
        case "CELL": 
            cell.addClass('cell');
            break;
    }
}

function respawnFood () {
    let vIndex = getRandomNumber(0, 15);
    let hIndex = getRandomNumber(0, 15);

    while (isClashWithSnakeBody({vIndex, hIndex})) {
        vIndex = getRandomNumber(0, 15);
        hIndex = getRandomNumber(0, 15);
    }

    return respawn("FOOD", vIndex, hIndex);
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

function reset() {
    snakeBody = [];
    currentDirection = "";
    foodCoord = {};
    score = 0;
}

function calculateMovement(head) {
    switch (currentDirection) {
        case "UP":
            head.vIndex--;
            break;
        case "BOTTOM":
            head.vIndex++;
            break;
        case "RIGHT":
            head.hIndex++;
            break;
        case "LEFT":
            head.hIndex--;
            break;
    }
    return head;
}