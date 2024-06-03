import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../moels/task.model'; // Corregir el nombre del archivo
import { TaskService } from '../task-service.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent {
  newTask: Task = { 
    title: '', 
    description: '', 
    deadline: '', 
    completed: false, 
    timeTaken: 0, // Agregar el campo timeTaken
    createdAt: '',
    completedAt: ''
  };
  errorMessage: string = '';

  constructor(private  taskService: TaskService,  private router: Router) { }

  addTask(): void {
    if (this.isValidTask()) {
      this.taskService.addTask(this.newTask).subscribe(
        () => {
          this.newTask = { title: '', description: '', deadline: '', completed: false, timeTaken: 0, createdAt: '', completedAt: '' };
          this.errorMessage = '';
          this.router.navigate(['/tasks']);
        },
        error => {
          console.error('Error adding task:', error);
          this.errorMessage = 'Could not add task; please try again later.';
        }
      );
    }
  }

  private isValidTask(): boolean {
    return this.newTask.title.trim() !== '' && this.newTask.description.trim() !== '' && this.newTask.deadline.trim() !== '';
  }
}
