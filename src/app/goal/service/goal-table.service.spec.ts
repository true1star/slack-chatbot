/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoalTableService } from './goal-table.service';

describe('GoalTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoalTableService]
    });
  });

  it('should ...', inject([GoalTableService], (service: GoalTableService) => {
    expect(service).toBeTruthy();
  }));
});
