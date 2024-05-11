import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../moels/task.model';
import { TaskService } from '../task-service.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent {
  newTask: Task = { title: '', description: '', deadline: '', completed: false };
  errorMessage: string = '';

  constructor(private taskService: TaskService, private router: Router) { }

  addTask(): void {
    if (this.isValidTask()) {
      this.taskService.getTasks().subscribe(tasks => {
        const lastTaskId = Number(tasks[tasks.length - 1]?.id || 0);
        this.newTask.id = String(lastTaskId + 1);
        this.taskService.addTask(this.newTask).subscribe(
          () => {
            // Lógica para manejar la respuesta del servidor (p. ej., actualizar la lista de tareas)
            this.newTask = { title: '', description: '', deadline: '', completed: false };
            this.errorMessage = ''; // Reiniciar mensaje de error
            // Redirigir de vuelta a la lista de tareas
            this.router.navigate(['/tasks']);
          },
          error => {
            console.error('Error adding task:', error);
            this.errorMessage = 'Could not add task; please try again later.';
          }
        );
      });
    }
  }
  

  private isValidTask(): boolean {
    return this.newTask.title.trim() !== '' && this.newTask.description.trim() !== '' && this.newTask.deadline.trim() !== '';
  }
}
