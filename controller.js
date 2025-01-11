document.addEventListener("keydown", function (event) {
    event.preventDefault(); 
    switch (event.key) {
        case "ArrowUp":
            if (currentDirection != "BOTTOM") currentDirection = "UP";
            break;
        case "ArrowDown":
            if (currentDirection != "UP") currentDirection = "BOTTOM";
            break;
        case "ArrowRight":
            if (currentDirection != "LEFT") currentDirection = "RIGHT";
            break;
        case "ArrowLeft":
            if (currentDirection != "RIGHT") currentDirection = "LEFT";
            break;
    }
});