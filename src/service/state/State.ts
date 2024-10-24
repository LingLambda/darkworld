export class State {
  constructor(
    public maxHp: number, //最大生命值,受力量影响
    private _hp: number, //当前生命值
    public ac: number, //护甲值,受服装影响
    public skill: string[], //拥有的技能
    public buffArray: string[], //角色身上有的buff
  ) {}
  get hp(){
    return this._hp;
  }
  set hp(x:number){
    this._hp += x;
    if(this._hp>this.maxHp ){
        this._hp=this.maxHp;
    }
    if(this._hp<0){
        this._hp=0;
    }
  }
  
  addBuff(buff: string) {
    this.buffArray.push(buff);
  }

  delBuff(buff: string) {
    this.buffArray.splice(this.buffArray.indexOf(buff), 1);
  }
}
