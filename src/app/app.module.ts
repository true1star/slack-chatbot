import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { GoalTableService } from './goal/service/goal-table.service';

import { AppComponent } from './app.component';
import { GoalFormComponent } from './goal/goal-form/goal-form.component';
import { TaskComponent } from './goal/task/task.component';
import { TaskDirective } from "./goal/task/task.directive";

@NgModule({
  declarations: [
    AppComponent,
    GoalFormComponent,
    TaskComponent,
    TaskDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [GoalTableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
