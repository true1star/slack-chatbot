import { Item } from './item';

export class Goal {
    constructor(public name, public thisWeek: Item[], public personal: Item[], public etc: Item[]) {}
}
