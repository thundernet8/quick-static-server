import { resolve } from "path";
import * as mkdirp from "mkdirp";
import * as yargs from "yargs";
import express = require("express");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const argv = yargs
  .version(function() {
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

const folder = resolve(argv.f);
mkdirp(folder);
app.use(express.static(folder));
app.listen(argv.p, argv.h, function() {
  console.log(`Folder: [${folder}] served on: http://${argv.h}:${argv.p}`);
});
