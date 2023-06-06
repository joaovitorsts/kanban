import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss']
})
export class FormTaskComponent{
  show: boolean = true;

  constructor() {
  }
}
