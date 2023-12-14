// create jewel namespace
var jewel = {
    screens : {}
};

// wait until main document is loaded
window.addEventListener("load", function() {

    Modernizr.addTest("standalone", function() {
        return (window.navigator.standalone != false);
    });

    // start dynamic loading
    Modernizr.load([
        {
            // these files are always loaded
            load : [
                "scripts/sizzle.js",
                "scripts/dom.js",
                "scripts/game.js",
                "scripts/screen.splash.js",
                "scripts/screen.main-menu.js"
            ],
            // called when all files have finished loading and executing
            complete : function() {
                // show the first screen
                jewel.game.showScreen("splash-screen");
            }
        }
    ]);
}, false);