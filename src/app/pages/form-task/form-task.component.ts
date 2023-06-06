import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Column } from 'src/app/models/column';
import { Task } from 'src/app/models/task';
import { ColumnService } from 'src/app/services/column.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss']
})
export class FormTaskComponent implements OnInit {
  formTask!: FormGroup;
  taskId: number = 0;
  startDate: Date | null = null;
  conclusionDate: Date | null = null;
  task: Task | null = null;


  constructor(private formBuilder: FormBuilder, private columnService: ColumnService, private taskService: TaskService,
    private route: ActivatedRoute) {
  }

  columns: Array<Column> = [];

  ngOnInit() {
    this.createForm();
    this.columns = this.columnService.getAllColumns();
  }

  createForm() {
    this.taskId = + (this.route.snapshot.paramMap.get('id') ?? 0);

    this.formTask = this.formBuilder.group(
      {
        title: null,
        column: null,
        startDate: null,
        conclusionDate: null,
        order: null
      });

    this.loadForm();
  }

  loadForm() {
    let finalTask: Task = new Task();
    if (this.taskId > 0) {
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (task) => {
          finalTask = new Task((task as Task).id, (task as Task).title, (task as Task).column,
            (task as Task).startDate, (task as Task).conclusionDate, (task as Task).order);

            this.formTask?.controls['title'].setValue(finalTask?.title);
            this.formTask?.controls['column'].setValue(finalTask?.column);
            this.formTask?.controls['startDate'].setValue(finalTask?.startDate);
            this.formTask?.controls['conclusionDate'].setValue(finalTask?.conclusionDate);
            this.formTask?.controls['order'].setValue(finalTask?.order);
        }
      });
      
    } else {
      this.formTask?.controls['column'].setValue(this.route.snapshot.paramMap.get('name'));
    }

    this.formTask?.updateValueAndValidity();
  }

 test(){
    console.log('teste')
    window.alert('test');
  }
}
