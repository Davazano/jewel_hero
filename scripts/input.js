jewel.input = (function() {
    var dom = jewel.dom,
        $ = dom.$,
        settings = jewel.settings,
        inputHandlers;

    var keys = {
        37 : "KEY_LEFT",
        38 : "KEY_UP",
        39 : "KEY_RIGHT",
        40 : "KEY_DOWN",
        13 : "KEY_ENTER",
        32 : "KEY_SPACE",
        65 : "KEY_A",
        66 : "KEY_B",
        67 : "KEY_C",
        // alpha keys 68 - 87
        88 : "KEY_X",
        89 : "KEY_Y",
        90 : "KEY_Z"
    };

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