var Langton = function(canvas, name) {
    var UP = 0;
    var RIGHT = 1;
    var DOWN = 2;
    var LEFT = 3;

    var letters = name.split("");
    var cycle = [{
        turn: letters[0],
        color: [255, 255, 255]
    }];

    for (var i = 1; i < letters.length; i++) {
        cycle.push({
            turn: letters[i],
            color: [Math.round(255 / letters.length * i), Math.round(Math.random() * 255), Math.round(Math.random() * 255)]
        });
    }

    var outsideBounds = false;

    var width = canvas.width;
    var height = canvas.height;

    var ctx = canvas.getContext('2d');

    var imageData = ctx.createImageData(width, height);
    for (var i = 0; i < imageData.data.length; i++) {
        imageData.data[i] = 255;
    }

    var x = Math.round(width / 2);
    var y = Math.round(height / 2);
    var direction = DOWN;
    var stepSize = 3;

    function step() {
        turn();
        flipPixel();
        moveForward();
    }

    function findCycle() {
        if (x >= 0 && x < width && y >= 0 && y < height) {
            var ind = (x + y * imageData.width) * 4;
            var r = imageData.data[ind + 0];
            var g = imageData.data[ind + 1];
            var b = imageData.data[ind + 2];
            for (var i = 0; i < cycle.length; i++) {
                if (r == cycle[i].color[0] && g == cycle[i].color[1] && b == cycle[i].color[2]) {
                    return i;
                }
            }
        }
        return 0;
    }

    function turn() {
        if (turnDirection() == "R") {
            turnRight()
        } else {
            turnLeft()
        }
    }

    function turnLeft() {
        if (direction === UP) {
            direction = LEFT;
        } else {
            direction--;
        }
    }

    function turnRight() {
        if (direction === LEFT) {
            direction = UP;
        } else {
            direction++;
        }
    }

    function moveForward() {
        switch(direction) {
            case UP:
            y -= stepSize;
            break;
            case RIGHT:
            x += stepSize;
            break;
            case DOWN:
            y += stepSize;
            break;
            case LEFT:
            x -= stepSize;
            break;
        }
    }

    function flipPixel() {
        var c = findCycle();

        if (c == cycle.length - 1) {
            c = 0;
        } else {
            c++;
        }

        for (var i = 0; i < stepSize; i++) {
            for (var j = 0; j < stepSize; j++) {
                if ((x + i) >= 0 && (x + i) < width && (y + j) >= 0 && (y + j) < height) {
                    var index = (i + x + (j + y) * imageData.width) * 4;
                    imageData.data[index + 0] = cycle[c].color[0];
                    imageData.data[index + 1] = cycle[c].color[1];
                    imageData.data[index + 2] = cycle[c].color[2];
                } else {
                    outsideBounds = true
                }
            }
        }
    }

    function turnDirection() {
        return cycle[findCycle()].turn;
    }

    function draw() {
        ctx.putImageData(imageData, 0, 0);
    }

    this.animate = function() {
        var interval = setInterval(function() {
            step();
            draw();
            if (outsideBounds) {
                clearInterval(interval);
            }
        }, 8);
    }

    this.render = function(iterations) {
        var i = 0;
        while (i < iterations) {
            step();
            i++;
            if (outsideBounds) {
                break;
            }
        }
        draw()
    }

};

