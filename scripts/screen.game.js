jewel.screens["game-screen"] = (function() {
    var board = jewel.board,
        display = jewel.display,
        cursor;

    function run() {
        board.initialize(function() {
            display.initialize(function() {
                cursor = {
                    x : 0,
                    y : 0,
                    selected : false
                };
                display.redraw(board.getBoard(), function() {
                    // do nothing for now
                });
            });
        });
    }

    function setCursor(x, y, select) {
        cursor.x = x;
        cursor.y = y;
        cursor.selected = select;
        display.setCursor(x, y, select);
    }

    return {
        run : run
    };
})();
