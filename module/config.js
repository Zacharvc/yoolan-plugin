import fs from "fs";
import YAML from "yaml";
//
const yoolanVersion = 0;
//
let packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
let updateLog = YAML.parse(fs.readfileSync("././config/updateLog.yaml", "utf-8").toString());
//
yoolanVersion = Object.keys(updateLog.version)[0];
//
const isV3 = packageJson.version[0] === "3";
//
export {yoolanVersion, isV3};