var resourceCache = {};
var readyCallbacks = [];

// Load an image url or an array of image urls
function load(urlOrArr) {
    if(urlOrArr instanceof Array) {
        urlOrArr.forEach(function(url) {
            _load(url);
        });
    }
    else {
        _load(urlOrArr);
    }
}

function _load(url) {
    var img = new Image();
    img.onload = function() {
        resourceCache[url] = img;

        if(isReady()) {
          exports.resourceCache = resourceCache;

          readyCallbacks.forEach(function(func) {
            func();
          });
        }
    };
    resourceCache[url] = false;
    img.src = url;
}

function get(url) {
    return resourceCache[url];
}

function isReady() {
    var ready = true;
    for(var img in resourceCache) {
        if(resourceCache.hasOwnProperty(img) &&
            resourceCache[img] == false) {
            ready = false;
        }
    }
    return ready;
}

function onReady(func) {
    readyCallbacks.push(func);
}

module.exports = { 
    load: load,
    get: get,
    onReady: onReady,
    isReady: isReady
};