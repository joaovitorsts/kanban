import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Column } from '../models/column';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(private dbService: NgxIndexedDBService) { 

  }

  public getAllColumns() {
    let columns: Array<Column> = [];
    this.dbService.getAll('column').subscribe({
      next: (data) => {
        data.forEach((e) => {
          let column: Column = new Column((e as Column).id, (e as Column).name);
          columns.push(column);
        });
      }, 
    });

    return columns;
  }
}
