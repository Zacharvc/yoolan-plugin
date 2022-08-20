import fs from "fs";
import YAML from "yaml";
//
const _path = process.cwd();
const _logPath = `${_path}/plugins/yoolan-plugin/config/updateLog.yaml`;
//
let yoolanVersion = "1.0.0";
//
let updateLog = YAML.parse(fs.readFileSync(_logPath, "utf-8").toString());
//
yoolanVersion = Object.keys(updateLog.version)[0].toString();
//
export {yoolanVersion, updateLog};