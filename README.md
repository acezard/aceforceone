# NPM Commands

* build: "browserify src/gameloop.js -o public/main.js",
* postinstall: "npm run build",
* watch: "watchify src/gameloop.js -o public/main.js",
* start: "node index.js",
* dev: "run-p build watch start"