import { Context } from "koishi";
import { CharacterTable, CharacterRepository } from "../character/CharacterRespository";
import { InventoryTable, InventoryRepository } from "../inventory/InventoryRepository";
import {classes} from "../../data/characterData";
import { createLogger } from "../../util/logger";

export class playerService{

    private ctx : Context;
    private log: import("reggol");
    constructor(ctx: Context) {
        this.ctx = ctx;
        this.log = createLogger(ctx, 'darkworld-player-service');
    }

    async createPlayer(
        userId: string,
        username: string,
        //race: string,
        aclass: string,
    ) {
        let aclassInfo = classes[aclass];
        const character: CharacterTable = {
            userid: userId,
            username: username,
            level: 1,
            exp: 0,
            //race: race,
            aclass: aclass,
            money: 1000,
            points: 0,
            strength: aclassInfo.strength,
            agility: aclassInfo.agility,
            intelligence: aclassInfo.intelligence,
            userDate: new Date(),
        }
        new CharacterRepository(this.ctx).createCharacter(character);
        this.log.debug(`为玩家 ${userId} 创建职业为 ${aclass} 的角色 '${username}' 成功`);
        return character;
    }

    async getCharacter(userId:string) {
        let character = new CharacterRepository(this.ctx).getCharacter(userId);
        if(!character){
            this.log.error(`获取玩家 ${userId} 保存的角色失败,无此角色'`);
            return null;
        }
        this.log.debug(`获取玩家 ${userId} 保存的角色成功,角色信息 ${character}'`);
        return character;
    }

    async dataSync(character: CharacterTable) {
        new CharacterRepository(this.ctx).dataSync(character);
        this.log.debug(`同步玩家 ${character.userid} 角色成功,角色信息 ${character}'`);
    }

}