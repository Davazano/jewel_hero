// create jewel namespace
var jewel = {
    screens : {},
    settings : {
        rows : 8,
        cols : 8,
        baseScore : 100,
        numJewelTypes : 7
    },
    images : {}
};

// wait until main document is loaded
window.addEventListener("load", function() {

    // determine jewel size
    var jewelProto = document.getElementById("jewel-proto"),
    rect = jewelProto.getBoundingClientRect();

    jewel.settings.jewelSize = rect.width;

    Modernizr.addTest("standalone", function() {
        return (window.navigator.standalone != false);
    });

    // extend yepnope with preloading
    yepnope.addPrefix("preload", function(resource) {
        resource.noexec = true;
        return resource;
    });

    var numPreload = 0,
    numLoaded = 0;

    yepnope.addPrefix("loader", function(resource) {
        // console.log("Loading: " + resource.url)
        
        var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
        resource.noexec = isImage;

        numPreload++;
        resource.autoCallback = function(e) {
            // console.log("Finished loading: " + resource.url)
            numLoaded++;
            if (isImage) {
                var image = new Image();
                image.src = resource.url;
                jewel.images[resource.url] = image;
            }
        };
        return resource;
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
                    "scripts/screen.main-menu.js"
                ]
            }, {
                test : Modernizr.webworkers,
                yep : [
                    "scripts/board.worker-interface.js",
                    "preload!scripts/board.worker.js"
                ],
                nope : "scripts/board.js"
            }, {
                load : [
                    "loader!scripts/screen.main-menu.js",
                    "loader!scripts/screen.game.js",
                    "loader!images/jewels"
                        + jewel.settings.jewelSize + ".png"
                ]
            }
        ]);
    }
}, false);