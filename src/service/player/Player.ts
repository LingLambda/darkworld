import { Character } from "../character/Character";
import { Inventory } from "../inventory/Inventory";
import { State } from "../state/State";


export class Player{
    constructor(
        public character:Character,
        public state:State,
        public inventory:Inventory,
    ) {
        
    }
}