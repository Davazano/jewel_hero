// The Worker Board Module
jewel.board = (function() {
    var dom = jewel.dom,
        settings,
        worker,
        messageCount,
        callbacks;
    
        function initialize(callback) {
            settings = jewel.settings;
            rows = settings.rows;
            cols = settings.cols;

            messageCount = 0;
            callbacks = [];
            worker = new Worker("scripts/board.worker.js");
        }

        function post(command, data, callback) {
            callbacks[messageCount] = callback;

            worker.postMessage({
                id : messageCount,
                command : command,
                data : data
            });
            messageCount++;
        }
})();