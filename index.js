import fs from "fs";
import {yoolanVersion} from "./module/config.js";
//
let initMsg = [
	"---------------------",
	`悠懒插件${yoolanVersion}初始化`
];
//打印日志
for(let Amsg of initMsg) logger.info(Amsg);
//
let apps = {};
//
const extensionsFile = fs.readdirSync("./plugins/yoolan-plugin/apps").filter((file) => file.endsWith(".js"));
//
for(let Afile of extensionsFile){
	//
	let fileName = Afile.replace(/(\.js)$/g, "");
	//
	apps[fileName] = (await import("./apps/" + Afile))[fileName];
}
//
export {apps};