jewel.input = (function() {

    function initialize() {
        inputHandlers = {};
        var board = $("#game-screen .game-board")[0];

        dom.bind(board, "mousedown", function(event) {
            handleClick(event, "CLICK", event);
        });
        
        dom.bind(board, "touchstart", function(event) {
            handleClick(event, "TOUCH", event.targetTouches[0]);
        });
        
        dom.bind(document, "keydown", function(event) {
            var keyName = keys[event.keyCode];
            if (keyName && settings.controls[keyName]) {
                event.preventDefault();
                trigger(settings.controls[keyName]);
            }
        });

    }

    function bind(action, handler) {
        if (!inputHandlers[action]) {
            inputHandlers[action] = [];
        }
        inputHandlers[action].push(handler);
    }

    return {
        initialize : initialize,
        bind : bind
    };
})();