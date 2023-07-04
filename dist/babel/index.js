"use strict";

require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.array.flat-map.js");
require("core-js/modules/es.array.unscopables.flat-map.js");
new Promise(function (resolve, reject) {});
[1, 2, 3].flatMap(function (x) {
  return [x, x * 2];
});
