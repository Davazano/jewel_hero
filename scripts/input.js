jewel.input = (function() {

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