// task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Task } from '../moels/task.model';
import { TaskService } from '../task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list-component.component.html',
  styleUrls: ['./task-list-component.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
  updateTaskStatus(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTaskStatus(task).subscribe();
  }
  
  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t !== task);
    });
  }
  
}
