import {segment} from "oicq";
import YAML from "yaml";
import fs from "fs";
//
import {allCharacters, gameDataInfo} from "../config/index.js";
//
let commonRoal = allCharacters.commonCharacters;
let rareRoal = allCharacters.rareCharacters;
//
export class pluginManager extends plugin{
	constructor(){
		super({
			name: "获取信息",
			dsc: "获取对应角色/物品信息",
			event: "message",
			priority: 80000,
			//
			rule: [
				{
					reg: "^#*(.*)信息$",
					fnc: "getInfo"
				}
				//
			]
		})
	};
	//
	async getInfo(e){
		//
		let input = e.msg.replace(/(^#|(信息)$)/g, "");
		//
		let hasFound = false;
		let roalName, roalId;
		//五星角色
		for(let item of rareRoal){
			if(item.name.includes(input)){
				hasFound = true;
				roalName = item.name;
				roalId = item.id;
			}
		}
		//四星角色
		for(let item of commonRoal){
			if(item.name.includes(input)){
				hasFound = true;
				roalName = item.name;
				roalId = item.id;
			}
		}
		//
		if(!hasFound){
			//
			e.reply(`没有找到 ${input} ！`);
			//
			return;
		}
		//
		if(!Object.keys(gameDataInfo).includes(roalId)){
			//
			e.reply(`没要找到 ${roalName} 的信息`);
			//
			return;
		}
		//
		e.reply(JSON.stringify(gameDataInfo.roalId));
		//
		return true;
	};
	//
};