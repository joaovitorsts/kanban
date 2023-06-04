import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop'
import { Board } from 'src/app/models/board';
import { Status } from 'src/app/models/status';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {

  statusTodo: Status = new Status('Todo');
  statusDoing: Status = new Status('Doing');
  statusDone: Status = new Status('Done');

  allStatus: Status[] = [
    this.statusTodo,
    this.statusDoing,
    this.statusDone
  ];

  date: Date = new Date();  

  tasksToDo : Task[] = [
    new Task("Get to work", this.statusTodo, this.date, this.date),
    new Task("Pick up groceries", this.statusTodo, this.date, this.date),
    new Task("Go home", this.statusTodo, this.date, this.date),
    new Task("Fall asleep", this.statusTodo, this.date, this.date),
  ];

  tasksDoing : Task[] = [
    new Task("Testing", this.statusDoing, this.date, this.date),
    new Task("Working", this.statusDoing, this.date, this.date),
    new Task("Eating", this.statusDoing, this.date, this.date),
  ];
    
  tasksDone : Task[] = [
    new Task("Get up", this.statusDone, this.date, this.date),
    new Task("Brush teeth", this.statusDone, this.date, this.date),
    new Task("Take a shower", this.statusDone, this.date, this.date)
  ];

  board: Board = new Board('Test Board', this.allStatus); 
  
  drop(event: CdkDragDrop<Task[]>){
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else{
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
