import fs from "fs";
import {yoolanVersion} from "./module/config.js";
//初始化日志内容
let initMsg = [
	"---------------------",
	`悠懒插件${yoolanVersion}初始化`
];
//打印日志
for(let Amsg of initMsg) logger.info(Amsg);
//
let apps = {};
//读取文件列表
const extensionsFile = fs.readdirSync("./plugins/yoolan-plugin/apps").filter((file) => file.endsWith(".js"));
//
for(let Afile of extensionsFile){
	//
	let fileName = Afile.replace(/(\.js)$/g, "");
	//
	apps[fileName] = (await import("./apps/" + Afile))[fileName];
}
//添加到apps
export {apps};