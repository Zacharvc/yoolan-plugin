import fs from "fs";
import YAML from "yaml";
//
const _path = process.cwd();
const _logPath = `${_path}/plugins/yoolan-plugin/config/updateLog.yaml`;
//
let yoolanVersion = "0";
//
let updateLog = YAML.parse(fs.readFileSync(_logPath, "utf-8").toString());
//
yoolanVersion = Object.keys(updateLog.version)[0].toString();
//
let currentLog = updateLog.version[yoolanVersion].join("\n");
//
export {yoolanVersion, currentLog};