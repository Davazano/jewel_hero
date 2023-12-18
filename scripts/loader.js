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
    // loading stage 1
    Modernizr.load([
        {
            // these files are always loaded
            load : [
                "scripts/sizzle.js",
                "scripts/dom.js",
                "scripts/game.js"
            ]
        }, {
            test : Modernizr.standalone,
            yep : "scripts/screen.splash.js",
            nope : "scripts/screen.install.js",
            // called when all files have finished loading and executing
            complete : function() {
                jewel.game.setup();
                if (Modernizr.standalone) {
                    // show the first screen
                    jewel.game.showScreen("splash-screen");
                } else {
                    jewel.game.showScreen("install-screen");
                }
            }
        }
    ]);

    // loading stage 2
    if (Modernizr.standalone) {
        Modernizr.load([
            {
                load : [
                    "scripts/screen.main-menu.js",
                    "scripts/board.js"
                ]
            }
        ]);
    }
}, false);