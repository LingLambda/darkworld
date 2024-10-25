import { State } from "../state/State";
import { Uint } from "../uint/Uint";

//敌人状态掉落物
export class Enemy implements Uint {
  constructor(
    public state: State,
    public items: string[],
    public money: number
  ) {}
}
