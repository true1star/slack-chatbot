import { Task } from './task/task';

export class Item {
    constructor(public main: Task, public sub: Task[]) {}
}