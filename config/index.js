import fs from "fs";
import YAML from "yaml";
//
const _path = process.cwd();
const _infoPath = `${_path}/plugins/yoolan-plugin/config/info.yaml`;
const _charactersPath = `${_path}/plugins/yoolan-plugin/config/characters.yaml`;
//
let gameDataInfo = YAML.parse(fs.readFileSync(_infoPath, "utf-8").toString());;
let allCharacters = YAML.parse(fs.readFileSync(_charactersPath, "utf-8").toString());
//
export {allCharacters, gameDataInfo};