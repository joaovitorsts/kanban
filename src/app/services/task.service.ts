import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { v4 as uuid } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { 
  }

  getAllColumns(){}

  getAllByColumn(){}

  getById(){}

  delete(){}

  update(){}
}
