const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const tinify = require("tinify");
tinify.key = "*****";

const readDir = (src, to, pathArr = []) => {
  var dirArr = fs.readdirSync(src);
  dirArr.forEach((file) => {
    const srcPath = path.resolve(src, `./${file}`);
    const toPath = path.resolve(to, `./${file}`);
    if (fs.statSync(srcPath).isDirectory()) {
      readDir(srcPath, toPath, pathArr);
    } else {
      pathArr.push({ srcPath, toPath });
    }
  });
  return pathArr;
};

module.exports = (from, to) => {
  const filePaths = readDir(from, to);
  filePaths.forEach((file) => {
    mkdirp(path.dirname(file.toPath));
    tinify.fromFile(file.srcPath).toFile(file.toPath);
  });
};
