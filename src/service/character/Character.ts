import { CharacterTable } from "./CharacterRespository";

export class Character implements CharacterTable {
  constructor(
    public userid: string, //用户id
    public username: string, //用户名称
    public level: number, //等级
    public exp: number, //经验
    public race: string, //种族
    public aclass: string, //职业
    public money: number, //金钱
    public points: number, //技能点
    public strength: number, //力量
    public agility: number, //敏捷
    public intelligence: number, //智力
    public userDate: Date //账户创建时间
  ) {}
}
