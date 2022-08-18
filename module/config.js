import fs from "fs";
import YAML from "yaml";

const yoolanVersion = 0;

let updateLog = YAML.parse(fs.readfileSync("././config/updateLog.yaml", "utf-8").toString());

yoolanVersion = Object.keys(updateLog.version)[0];

export {yoolanVersion};