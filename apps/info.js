import {segment} from "oicq";
import YAML from "yaml";
import fs from "fs";
//
import {allCharacters, gameDataInfo} from "../config/index.js";
//
let commonRoal = allCharacters.commonCharacters;
let rareRoal = allCharacters.rareCharacters;
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
		let hasFound = false;
		let roalName, roalId;
		//五星角色
		for(let item of rareRoal){
			if(item.name.includes(input)){
				hasFound = true;
				roalName = item.name[0];
				roalId = item.id;
			}
		}
		//四星角色
		for(let item of commonRoal){
			if(item.name.includes(input)){
				hasFound = true;
				roalName = item.name[0];
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
		if(e.isMaster) e.reply(JSON.stringify(gameDataInfo)));
		//
		if(!Object.keys(gameDataInfo).includes(roalId.toString())){
			//
			e.reply(`没要找到 ${roalName}(${roalId}) 的数据`);
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