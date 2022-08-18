import {segment} from "oicq";
import {exec} from "child_process";
import {yoolanVersion, currentLog} from "../module/config.js";

const _path = process.cwd();
const _yoolanPluginPath = `${_path}/plugins/yoolan-plugin/`;

let timer;

export class admin extends plugin{
	constructor(){
		super({
			name: "悠懒插件管理",
			dsc: "Yoolan-plugin插件管理",
			event: "message",
			priority: 70000,
			//
			rule: [
				{
					reg: "^#*(Yoolan|悠懒)(插件)*(强制)*更新$",
					fnc: "updateYoolanPlugin"
				},
				{
					reg: "^#*(Yoolan|悠懒)更新日志$",
					fnc: "updateYoolanLog"
				}
			]
		});
	};
	//
	async updateYoolanPlugin(e){
		//
		if(!e.isMaster) return;
		//
		let command = "git  pull";
		let isForced = e.msg.includes("强制");
		//
		if(isForced){
			command = "git  checkout . && git  pull";
			e.reply("正在执行强制更新操作，请稍等");
		}else e.reply("正在执行更新操作，请稍等");
		//
		exec(command, {cwd: _yoolanPluginPath}, function(error, stdout, stderr){
			//
			if(/Already up[ -]to[ -]date/.test(stdout) || stdout.includes("最新")){
				e.reply("目前已经是最新版Yoolan插件了");
				//
				return true;
			}
			//
			if(error){
				e.reply("Yoolan插件更新失败！\nError code: " + error.code + "\n" + error.stack + "\n 请稍后重试。");
				//
				return true;
			}
			//
			e.reply("Yoolan插件更新成功，尝试重新启动Yunzai以应用更新...");
			//
			timer && clearTimeout(timer);
			redis.set("yoolan:restart-msg", JSON.stringify({
				msg: "重启成功，新版Yoolan插件已经生效",
				qq: e.user_id
			}), {
				EX: 30
			});
			timer = setTimeout(function() {
				//
				let command = `npm run start`;
				if(process.argv[1].includes("pm2")) command = `npm run restart`;
				//
				exec(command, function(error, stdout, stderr){
					//
					if(error){
						//
						e.reply("自动重启失败，请手动重启以应用新版Yoolan插件。\nError code: " + error.code + "\n" + error.stack + "\n");
						Bot.logger.error(`重启失败\n${error.stack}`);
						//
						return true;
					}else if(stdout){
						//
						Bot.logger.mark("重启成功，运行已转为后台，查看日志请用命令：npm run log");
						Bot.logger.mark("停止后台运行命令：npm stop");
						process.exit();
					}
				});
			}, 1000);
		});
		//
		return true;
	};
	//
	async updateYoolanLog(e){
		//
		if(!e.isMaster) return;
		//
		let replyMsg = [`当前版本: ${yoolanVersion}`];
		for(let content of currentLog) replyMsg.push(content);
		//
		e.reply(replyMsg);
		//
		return true;
	};
};