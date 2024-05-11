import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAddComponent } from './task-add/task-add.component'; // Importa el componente TaskAddComponent
import { TaskListComponent } from './task-list-component/task-list-component.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }, // Ruta por defecto redirige a la lista de tareas
  { path: 'tasks', component: TaskListComponent }, // Ruta para la lista de tareas
  { path: 'add-task', component: TaskAddComponent }, // Nueva ruta para agregar una tarea
  // Otras rutas de ser necesario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
