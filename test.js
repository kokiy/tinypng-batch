const path = require("path");

const tinyImg = require("./index");

const dirPath = path.resolve("./img");
const outPath = path.resolve("./compress");

tinyImg(dirPath, outPath);
