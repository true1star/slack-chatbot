import { Component, OnInit, Input, HostListener } from '@angular/core';

import {Item} from "../item";
import {Task} from "./task";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() items: Item[];

  constructor() { }

  ngOnInit() {
    console.log(this.items);
  }

  toggleEdit(sub: Task, input) {
    console.log(sub);
    if ( input ) {
       sub.task = input;
    }
    sub.isEdit = !sub.isEdit;
  }

  onAddSub(item: Item) {
    const task = new Task('');
    task.isEdit = true;
    item.sub.push(task);
    console.log(item);
  }

  deleteTask(item: Item, index: number) {
    item.sub.splice(index, 1);
  }
}
