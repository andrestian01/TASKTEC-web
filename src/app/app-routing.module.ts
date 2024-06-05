import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShareTaskComponent } from './share-task/share-task.component';
import { TaskAddComponent } from './task-add/task-add.component'; // Importa el componente TaskAddComponent
import { TaskListComponent } from './task-list-component/task-list-component.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] }, // Ruta para la lista de tareas
  { path: 'add-task', component: TaskAddComponent, canActivate: [AuthGuard] }, // Nueva ruta para agregar una tarea
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }, // Ruta por defecto redirige a la lista de tareas
  { path: 'share-task/:id', component: ShareTaskComponent },
  // Otras rutas de ser necesario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
