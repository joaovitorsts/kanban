import { Column } from 'src/app/models/column';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Task } from 'src/app/models/task';
import { columnKanbanEnum } from 'src/app/enum/column-kanban-enum';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  columns: Array<Column> = [];
  tasks: Array<Task> = [];
  toDoTasks: Array<Task> = [];
  doingTasks: Array<Task> = [];
  doneTasks: Array<Task> = [];


  ngOnInit(): void {
    this.createColumnsDefault();
    // Initial tasks Seeding
    // this.createTasksToDo();
    // this.createTasksDoing();
    // this.createTasksDone();
    this.getAllColumns();
    this.getAllTasks();
  }

  constructor(private dbService: NgxIndexedDBService) {

  }

  private createColumnsDefault() {
    try {
      this.dbService.add('column', { name: 'toDo' }).subscribe((key) => {

      });
      this.dbService.add('column', { name: 'Doing' }).subscribe((key) => {

      });
      this.dbService.add('column', { name: 'Done' }).subscribe((key) => {

      });
    } catch (e) {
      console.log("Columns are existents");
    }
  }

  private getAllColumns() {
    this.dbService.getAll('column').subscribe({
      next: (data) => {
        data.forEach((e) => {
          let column: Column = new Column((e as Column).id, (e as Column).name);
          this.columns.push(column);
        });
      }
    });
  }

  private createTasksToDo() {
    try {
      this.dbService.add('task', {
        title: 'test', column: 1, startDate: new Date(2023, 0o6, 0o6),
        conclusionDate: new Date(2023, 0o6, 0o7), order: 1
      }).subscribe((key) => { });
      this.dbService.add('task', {
        title: 'develop', column: 1, startDate: new Date(2023, 0o7, 0o7),
        conclusionDate: new Date(2023, 0o6, 0o7), order: 2
      }).subscribe((key) => { });
      this.dbService.add('task', {
        title: 'deliver', column: 1, startDate: new Date(2023, 0o6, 0o7),
        conclusionDate: new Date(2023, 0o6, 0o7), order: 3
      }).subscribe((key) => { });
    } catch (e) {
      console.log("Error on tasks creation");
    }
  }


  private createTasksDoing() {
    try {
      this.dbService.add('task', {
        title: 'run', column: 2, startDate: new Date(2023, 0o6, 0o6),
        conclusionDate: new Date(2023, 0o6, 0o7), order: 1
      }).subscribe((key) => { });
      this.dbService.add('task', {
        title: 'make a cake', column: 2, startDate: new Date(2023, 0o7, 0o7),
        conclusionDate: new Date(2023, 0o6, 0o7), order: 2
      }).subscribe((key) => { });
      this.dbService.add('task', {
        title: 'look the sunrise', column: 2, startDate: new Date(2023, 0o6, 0o7),
        conclusionDate: new Date(2023, 0o6, 0o7), order: 3
      }).subscribe((key) => { });
    } catch (e) {
      console.log("Error on tasks creation");
    }
  }

  private createTasksDone() {
    try {
      this.dbService.add('task', {
        title: 'sleep', column: 3, startDate: new Date(2023, 0o6, 0o6),
        conclusionDate: new Date(2023, 0o6, 0o7), order: 1
      }).subscribe((key) => { });
      this.dbService.add('task', {
        title: 'write a book', column: 3, startDate: new Date(2023, 0o7, 0o7),
        conclusionDate: new Date(2023, 0o6, 0o7), order: 2
      }).subscribe((key) => { });
      this.dbService.add('task', {
        title: 'buy a house', column: 3, startDate: new Date(2023, 0o6, 0o7),
        conclusionDate: new Date(2023, 0o6, 0o7), order: 3
      }).subscribe((key) => { });
    } catch (e) {
      console.log("Error on tasks creation");
    }
  }

  private getAllTasks() {
    this.dbService.getAll('task').subscribe({
      next: (data) => {
        data.forEach((e) => {
          let task: Task = new Task((e as Task).id, (e as Task).title, (e as Task).column,
            (e as Task).startDate, (e as Task).conclusionDate, (e as Task).order);
          if (task.column == columnKanbanEnum.ToDo) {
            this.toDoTasks.push(task);
          } else if (task.column == columnKanbanEnum.Doing) {
            this.doingTasks.push(task);
          }
          else if (task.column == columnKanbanEnum.Done) {
            this.doneTasks.push(task);
          }
        });
      }
    });
    console.log(this.toDoTasks)
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
