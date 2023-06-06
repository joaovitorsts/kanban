import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { v4 as uuid } from 'uuid';
import { Task } from '../models/task';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private dbService: NgxIndexedDBService) {

  }

  getTaskById(taskId: number): Observable<unknown> {
    return this.dbService.getByKey('task', taskId);
  }
}
