"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const mkdirp = require("mkdirp");
const yargs = require("yargs");
const express = require("express");
const app = express();
const argv = yargs
    .version(function () {
    return require("../package.json").version;
})
    .alias("v", "version")
    .alias("p", "port")
    .alias("h", "host")
    .alias("f", "folder")
    .usage("Usage: $0 <command> [options]")
    .example("$0 -h 0.0.0.0 -p 8080 -f .", "")
    .default("p", 8080)
    .default("h", "0.0.0.0")
    .default("f", ".")
    .describe("p", "Listen port")
    .describe("h", "Listen host")
    .describe("f", "Folder to serve")
    .epilog("Copyright " + new Date().getFullYear())
    .help().argv;
const folder = path_1.resolve(argv.f);
mkdirp(folder);
app.use(express.static(folder));
app.listen(argv.p, argv.h, function () {
    console.log(`Folder: [${folder}] served on: http://${argv.h}:${argv.p}`);
});
