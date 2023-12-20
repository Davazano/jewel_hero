jewel.board = (function() {
    var settings,
        jewels,
        cols,
        rows,
        baseScore,
        numJewelTypes;

    function initialize(callback) {
        settings = jewel.settings;
        numJewelTypes = settings.numJewelTypes;
        baseScore = settings.baseScore;
        cols = settings.cols;
        rows = settings.rows;
        fillBoard();
        callback();
    }

    function print() {
        var str = "";
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < cols; x++) {
                str += getJewel(x, y) + " ";
            }
            str += "\r\n";
        }
        console.log(str);
    }

    // return integer between 0 and (numJewelTypes - 1)
    function randomJewel() {
        return Math.floor(Math.random() * numJewelTypes);
    }

    function getJewel(x, y) {
        if (x < 0 || x > cols-1 || y < 0 || y >rows-1) {
            return -1;
        } else {
            return jewels[x][y];
        }
    }

    function fillBoard() {
        var x, y;
        jewels = [];
        for (x = 0; x < cols; x++) {
            jewels[x] = [];
            for (y = 0; y < rows; y++) {
                type = randomJewel();
                /* Removing the initial chains */
                while ((type === getJewel(x-1, y) && type === getJewel(x-2, y)) ||
                       (type === getJewel(x, y -1) && type === getJewel(x, y-2))) {
                    type = randomJewel();
                }
                jewels[x][y] = type;
            }
        }
    }

    // returns the number jewels in the longest chain
    // that includes (x,y)
    function checkChain(x, y) {
        var type = getJewel(x, y),
            left = 0, right = 0,
            down = 0, up = 0;

        // look right
        while (type === getJewel(x + right + 1, y)) {
            right++;
        }

        // look left
        while (type === getJewel(x - left - 1, y)) {
            left++;
        }

        // left up
        while (type === getJewel(x, y + up + 1)) {
            up++;
        }

        // look down
        while (type === getJewel(x, y - down - 1)) {
            down++;
        }

        return Math.max(left + 1 + right, up + 1 + down);
    }

    // returns true if [x1, y1] can be swapped with (x2, y2)
    // to form a new match
    function canSwap(x1, y1, x2, y2) {
        var type1 = getJewel(x1, y1),
            type2 = getJewel(x2, y2),
            chain;
        
        if (!isAdjacent(x1, y1, x2, y2)) {
            return false;
        }

        // temporarily swap jewels
        jewels[x1][y1] = type2;
        jewels[x2][y2] = type1;

        chain = (checkChain(x2, y2) > 2 || checkChain(x1, y1) > 2);

        // swap back
        jewels[x1][y1] = type1;
        jewels[x2][y2] = type2;

        return chain;
    }

    // returns true if (x1, y1) is adjacent to (x2, y2)
    function isAdjacent(x1, y1, x2, y2) {
        var dx = Math.abs(x1 - x2),
            dy = Math.abs(y1 - y2);
        // the sum of the two position is 1 if they are adjacent. This is also called Manhattan distance
        return (dx + dy === 1);
    }

    // return a two-dimensional map of chain-lengths
    function getChains() {
        var x, y,
            chains = [];

        for (x = 0; x < cols; x++) {
            chain[x] = [];
            for (y = 0; y < rows; y++) {
                chains[x][y] = checkChain(x, y);
            }
        }

        return chains;
    }

    return {
        canSwap : canSwap,
        initialize : initialize,
        print : print
    }
})();