import { Character } from "../character/Character";
import { Inventory } from "../inventory/Inventory";
import { State } from "../state/State";
import { Uint } from "../uint/Uint";


export class Player implements Uint{
    constructor(
        public character:Character,
        public state:State,
        public inventory:Inventory,
    ) {
        
    }
}