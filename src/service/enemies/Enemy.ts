import { State } from "../state/State";
import { Uint } from "../uint/Uint";

export class Enemy implements Uint {
  constructor(
    public state: State,
    public items: string[],
    public money: number
  ) {}
}
