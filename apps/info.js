import {segment} from "oicq";
import YAML from "yaml";
import fs from "fs";
//
import {allCharacters, gameDataInfo} from "../config/index.js";
//
let commonRoal = allCharacters.commonCharacters;
let rareRoal = allCharacters.rareCharacters;
//
async function searchTarget(target){
	//
	let foundData;
	let hasFound = false;
	//五星角色
	for(let item of rareRoal){
		if(item.name.includes(target)){
			hasFound = true;
			foundData = item;
		}
	}
	//四星角色
	for(let item of commonRoal){
		if(item.name.includes(target)){
			hasFound = true;
			foundData = item;
		}
	}
	//
	if(!hasFound) return false;
	//
	return foundData;
};
//
export class info extends plugin{
	constructor(){
		super({
			name: "获取数据信息",
			dsc: "获取对应角色/物品数据信息",
			event: "message",
			priority: 80000,
			//
			rule: [
				{
					reg: "^#*(.*)数据$",
					fnc: "getInfo"
				},
				{
					reg: "^#*(.*)角色别名$",
					fnc: "getRoalNickname"
				}
				//
			]
		})
	};
	//
	async getInfo(e){
		//
		let input = e.msg.replace(/(^#|(数据)$)/g, "");
		//
		let roalName, roalId;
		let hasFound = false;
		//
		let getData = searchTarget(input);
		//
		logger.info(getData);
		//
		if(getData){
			hasFound = true;
			roalId = getData.id;
			roalName = getData.name[0];
		}
		//
		if(!hasFound){
			//
			e.reply(`没有找到目标：${input}`);
			//
			return;
		}
		//
		if(!Object.keys(gameDataInfo).includes(roalId.toString())){
			//
			e.reply(`暂时没有 ${roalName}(${roalId}) 的数据`);
			//
			return;
		}
		//
		if(gameDataInfo[roalId].info) e.reply(JSON.stringify(gameDataInfo[roalId].info));
		//
		return true;
	};
	//
	async getRoalNickname(e){
		//
		let input = e.msg.replace(/(^#|(角色别名)$)/g, "");
		//
		let roalName, roalId, roalNickname;
		let hasFound = false;
		//
		let getData = searchTarget(input);
		if(getData){
			hasFound = true;
			roalId = getData.id;
			roalName = getData.name[0];
			roalNickname = getData.name;
		}
		//
		if(!hasFound){
			//
			e.reply(`没有找到角色：${input}`);
			//
			return;
		}
		//
		e.reply(roalNickname.join("\n"));
		//
		return true;
	};
	//
};