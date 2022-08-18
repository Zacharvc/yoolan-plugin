import fs from "fs";
import {yoolanVersion, isV3} from "./module/config.js";
//
let initMsg = [
	"====================",
	"Yoolan-plugin插件初始化开始",
	`当前插件版本: ${yoolanVersion}`,
	"===================="
];
//
if(!isV3) initMsg.push("当前不是v3云崽！");
//打印日志
for(let Amsg of initMsg) logger.info(Amsg);
//
let apps = {};
//
const extensionsFile = fs.readdirSync("./plugins/yoolan-plugin/apps").filter((file) => file.endsWith(".js"));
//
for(let file of extensionsFile){
	//
	let fileName = file.replace(/(\.js)$/g, "");
	//
	apps[fileName] = (await import('./apps/'+file))[fileName];
}
//
export {apps};