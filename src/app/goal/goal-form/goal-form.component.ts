import { Component, OnInit } from '@angular/core';

import { Item } from '../item';
import { Task } from '../task/task';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.css']
})
export class GoalFormComponent implements OnInit {
  item: Item;
  items: Item[] = [];
  constructor() { }

  private addTask(item: Item) {
    this.items.push(item);
  }

  ngOnInit() {
    this.addTask(new Item(new Task('init Task!'), [new Task('init sub1 !'), new Task('init sub2 !')]));
    this.addTask(new Item(new Task('init2 Task!'), [new Task('init 2sub1 !'), new Task('init 2sub2 !')]));
    console.log('init!');
  }

  onAddTask() {
    console.log("added!");
    this.addTask(new Item(new Task('new Task!'), [new Task('new sub!'), new Task('new sub!')]));
  }

}
