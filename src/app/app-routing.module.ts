import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { FormTaskComponent } from './pages/form-task/form-task.component';

const routes: Routes = [
  {
    path: '', component: MainViewComponent,
  },
  {
    path: 'task/:id', component: FormTaskComponent
  },
  {
    path: 'task/:column', component: FormTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
