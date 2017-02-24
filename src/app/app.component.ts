import { Component, OnInit } from '@angular/core';
import {
  FormArray, FormGroup, FormControl, Validators, FormBuilder
} from "@angular/forms";

import { Goal } from './goal/goal';
import { GoalTableService } from './goal/service/goal-table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private goalTableService: GoalTableService,
              private formBuilder: FormBuilder) {}
  goal: Goal;
  goals: Goal[] = [];
  goalForm: FormGroup;

  ngOnInit() {
    this.initForm();
    //this.goals = this.goalTableService.fetchGoal();
    this.goalTableService.fetchGoal().subscribe(
        data => {
          for( let key in data ){
            if(data.hasOwnProperty(key)){
              this.goals.push(new Goal(data[key].name, data[key].thisWeek, data[key].personal, data[key].etc));
            }
          }
          console.log(this.goals);
        }
    );
    // this.goalTableService.tableChanged.subscribe(
    //     (goals : Goal[]) => this.goals = goals
    // );
  }

  onSubmit() {
    const newGoal = this.goalForm.value;
    this.goalTableService.storeGoal(newGoal).subscribe(
        data => console.log(data),
        err => console.log(err)
    );
  }

  private initForm() {
    let name = '';
    let thisWeekGoal = '';
    let personalGoal = '';
    let anyOther = '';

    this.goalForm = this.formBuilder.group({
      name: [name, Validators.required],
      thisWeek: [thisWeekGoal, Validators.required],
      personal: [personalGoal],
      etc: [anyOther]
    })
  }



  title = 'app works!';
}
