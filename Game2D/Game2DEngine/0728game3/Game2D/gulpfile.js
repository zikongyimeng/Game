/**
 * Created by plter on 7/26/16.
 */

const gulp = require("gulp");
const shell = require("gulp-shell");
const fs = require("fs");

const closureCompilerFileName = "closure-compiler-v20160713.jar";
const closureCompilerFile = `${__dirname}/tools/${closureCompilerFileName}`;
const distDir = `${__dirname}/dist`;
const gcc/*Google closure compiler*/ = `java -jar ${closureCompilerFile}`;
const libSrcFiles = [
    "cn/ucai/game2d/events/G2DEvent.js",
    "cn/ucai/game2d/events/G2DMouseEvent.js",
    "cn/ucai/game2d/events/G2DEventDispatcher.js",
    "cn/ucai/game2d/display/Display.js",
    "cn/ucai/game2d/display/Rectangle.js",
    "cn/ucai/game2d/display/Text.js",
    "cn/ucai/game2d/display/Container.js",
    "cn/ucai/game2d/anim/PropertyAnim.js",
    'cn/ucai/game2d/app/Game2dApp.js'
];

function cloneArray(arr) {
    var newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i]);
    }
    return newArr;
}

function insertLibSrcFilesToSrcFilesArray(srcFilesArr) {
    for (let i = libSrcFiles.length - 1; i >= 0; i--) {
        srcFilesArr.splice(0, 0, libSrcFiles[i]);
    }
}

function defineTasks(distFileName, srcFiles, taskName) {
    const distFile = `${distDir}/${distFileName}`;
    const distMapFileName = `${distFileName}.map`;
    insertLibSrcFilesToSrcFilesArray(srcFiles);

    const compileScript = `${gcc} --js_output_file ${distFile} --create_source_map ${distMapFileName} --js ${srcFiles.join(" ")}`;

    const compileTaskName = `compile${taskName}`;
    const appendMapInfoTaskName = `appendMapInfoTo${taskName}`;

    gulp.task(compileTaskName, shell.task([
        `echo "${compileScript}"`,
        compileScript
    ], {cwd: "src"}));
    gulp.task(appendMapInfoTaskName, [compileTaskName], function () {
        fs.appendFileSync(distFile, `\n//# sourceMappingURL=../src/${distMapFileName}\n`);
    });

    gulp.task(taskName, [appendMapInfoTaskName]);
}


function init() {
    defineTasks("AnimDemos.min.js", ["cn/ucai/demos/anim/AnimDemo.js"], "AnimDemo");
    defineTasks("CardMemory.min.js", [
        "cn/ucai/demos/cardmemory/Card.js",
        "cn/ucai/demos/cardmemory/CardMemory.js"
    ], "CardMemory");

    gulp.task("default", ["AnimDemo", "CardMemory"]);
}

init();