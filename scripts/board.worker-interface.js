// The Worker Board Module
jewel.board = (function() {
    var dom = jewel.dom,
        settings,
        worker;
    
        function initialize(callback) {
            settings = jewel.settings;
            rows = settings.rows;
            cols = settings.cols;

            worker = new Worker("scripts/board.worker.js");
        }
})();