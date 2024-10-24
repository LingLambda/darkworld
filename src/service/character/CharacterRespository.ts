import { Context, Database, Logger, Tables, Types } from "koishi";
import { createLogger } from "../../util/logger";
declare module "koishi" {
  interface Tables {
    character: CharacterTable;
  }
}

export interface CharacterTable {
  userid: string; //用户id
  username: string; //用户名称
  level: number; //用户等级
  exp: number; //用户经验
  //race: string; //用户种族
  aclass: string; //职业
  money: number; //用户金钱
  points: number; //技能点
  strength: number; //力量
  agility: number; //敏捷
  intelligence: number; //智力
  userDate: Date; //用户账户创建时间
}

export class CharacterRepository {
  private ctx: Context;
  private db: Database<Tables, Types, Context> & Context.Database<Context>;
  private log: Logger;
  constructor(ctx: Context) {
    this.log = createLogger(ctx, "darkworld-character-respository");
    this.ctx = ctx;
    this.db = ctx.database;
    ctx.model.extend(
      "character",
      {
        userid: "string",
        username: "string",
        level: "unsigned",
        exp: "unsigned",
        //race: "string",
        aclass: "string",
        money: "integer",
        points: "integer",
        strength: "integer",
        agility: "integer",
        intelligence: "integer",
        userDate: "timestamp",
      },
      {
        primary: "userid",
      }
    );
  }
  /**
   * 查询指定角色信息
   * @param userid 用户id
   * @returns CharacterTable对象
   */
  async getCharacter(userid: string): Promise<CharacterTable[]> {
    try {
      let character = await this.db.get("character", { userid: userid });
      return character;
    } catch (err) {
      this.log.error(`数据库查询错误, 错误信息 ${err}`);
      return null;
    }
  }
  /**
   * 创建角色
   * @param character 角色各项属性
   */
  async createCharacter(character: CharacterTable) {
    try {
      await this.db.create("character", character);
    } catch (err) {
      this.log.error(`数据库插入错误, 错误信息 ${err}`);
    }
  }

  /**
   * 内存与db同步
   * @param character 更新的数据
   */
  async dataSync(character: CharacterTable) {
    try {
      await this.db.upsert(
        "character",
        [
          {
            userid: character.userid,
            username: character.username,
            level: character.level,
            exp: character.exp,
            //race: character.race,
            aclass: character.aclass,
            money: character.money,
            points: character.points,
            strength: character.strength,
            agility: character.agility,
            intelligence: character.intelligence,
            userDate: character.userDate,
          },
        ],
        "userid"
      );
      return true;
    } catch (err) {
      this.log.error(`数据库更新错误, 错误信息 ${err}`);
      return false;
    }
  }
}
