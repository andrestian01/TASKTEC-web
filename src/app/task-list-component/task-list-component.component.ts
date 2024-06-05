import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TaskService } from '../../service/task-service.service';
import { Task } from '../moels/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list-component.component.html',
  styleUrls: ['./task-list-component.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  filteredTasks: Task[] = [];
  searchTitle:string='';
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks.map(task => ({
        ...task,
        deadline: moment(task.deadline).format('YYYY-MM-DD'),
        completedAt: task.completedAt ? moment(task.completedAt).format('YYYY-MM-DD') : undefined,  // Usar undefined aquí
      }));
      this.filteredTasks = this.tasks;
    });
  }

  filterTasks(showCompleted: boolean | null): void {
    if (showCompleted === null) {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(task => task.completed === showCompleted);
    }
  }

  updateTaskStatus(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTaskStatus(task).subscribe(updatedTask => {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = {
          ...updatedTask,
          deadline: moment(updatedTask.deadline).format('YYYY-MM-DD'),
          completedAt: updatedTask.completedAt ? moment(updatedTask.completedAt).format('YYYY-MM-DD') : undefined,  // Usar undefined aquí
        };
      }
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
      this.filteredTasks = this.filteredTasks.filter(t => t.id !== task.id);
    });
  }

  formatTimeTaken(timeTaken: number): string {
    const duration = moment.duration(timeTaken);
    return `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
  }
  filterTasksb() {
    // Filtrar las tareas basadas en el título
    // Si `searchTitle` está vacío, mostrar todas las tareas
    if (!this.searchTitle.trim()) {
      this.loadTasks();
    } else {
      this.tasks = this.tasks.filter(task =>
        task.title.toLowerCase().includes(this.searchTitle.trim().toLowerCase())
      );
    }
  }

  clearSearch(): void {
    this.searchTitle = ''; // Limpiar el campo de búsqueda
    this.loadTasks(); // Volver a cargar todas las tareas
  }
}
