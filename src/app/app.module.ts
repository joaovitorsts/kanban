import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './pages/main-view/main-view.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { FormTaskComponent } from './pages/form-task/form-task.component';


export function migrationFactory() {
  return {
    1: (db: any, transaction: any) => {
      const store = transaction.objectStore("column");
      store.createIndex("id", "id", { unique: true });
    },
    2: (db: any, transaction: any) => {
      const store = transaction.objectStore("task");
      store.createIndex("id", "id", { unique: true });
    },
  }
}
const dbConfig: DBConfig = {
  name: 'Kanban',
  version: 1,
  objectStoresMeta: [
    {
      store: 'column',
      storeConfig: { autoIncrement: true, keyPath: 'id' },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: true } }
      ]
    },
    {
      store: 'task',
      storeConfig: { autoIncrement: true, keyPath: 'id' },
      storeSchema: [
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'column', keypath: 'column', options: { unique: false } },
        { name: 'startDate', keypath: 'startDate', options: { unique: false } },
        { name: 'conclusionDate', keypath: 'conclusionDate', options: { unique: false } },
        { name: 'order', keypath: 'order', options: { unique: false } },
      ]
    }],
  migrationFactory
};


@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    FormTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
