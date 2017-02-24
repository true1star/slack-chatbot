import { Injectable, EventEmitter } from '@angular/core';

import {Headers, Http, Response} from "@angular/http";
import 'rxjs/Rx';

import {Goal} from "../goal";

@Injectable()
export class GoalTableService {
  private goals: Goal;

  constructor(private http: Http) {}

  tableChanged = new EventEmitter<Goal[]>();

  storeGoal(goal: Goal) {
    const body = JSON.stringify(goal);
    const headers = new Headers({
      'Content-Type': 'applicaation/json'
    });
    return this.http.post('https://fin2bpersonal.firebaseio.com/goaltable.json', body, { headers: headers });
  }

  fetchGoal() {
    return this.http.get('https://fin2bpersonal.firebaseio.com/goaltable.json')
          .map(this.extractData);
        // .subscribe(
        //     (data: Goal[]) => {
        //       this.goals = data;
        //       console.log(this.goals);
        //       this.tableChanged.emit(this.goals);
        //     }
        // )
  }

  private extractData (res: Response){
    let body = res.json();
    console.log(body);
    return body || {};
  }

}
