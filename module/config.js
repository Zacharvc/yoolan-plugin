import fs from "fs";
import YAML from "yaml";
//
const _path = process.cwd();
const _logPath = `${_path}/plugins/yoolan-plugin/config/updateLog.yaml`;
//
let yoolanVersion = 0;
//
let packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
let updateLog = YAML.parse(fs.readFileSync(_logPath, "utf-8").toString());
//
yoolanVersion = Object.keys(updateLog.version)[0];
//
let currentLog = updateLog.version[yoolanVersion].join("\n");
//
const isV3 = packageJson.version[0] === "3";
//
export {yoolanVersion, currentLog, isV3};