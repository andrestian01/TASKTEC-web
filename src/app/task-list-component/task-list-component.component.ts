import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Task } from '../moels/task.model';
import { TaskService } from '../task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list-component.component.html',
  styleUrls: ['./task-list-component.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks.map(task => ({
        ...task,
        deadline: moment(task.deadline).format('YYYY-MM-DD'),
        completedAt: moment(task.completedAt).format('YYYY-MM-DD'),
        //createdAt: moment(task.createdAt).format('YYYY-MM-DD HH:mm:ss')
      }));
    });
  }

  updateTaskStatus(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTaskStatus(task).subscribe(updatedTask => {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = {
          ...updatedTask,
          deadline: moment(updatedTask.deadline).format('YYYY-MM-DD'),
          createdAt: moment(updatedTask.createdAt).format('YYYY-MM-DD HH:mm:ss')
        };
      }
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    });
  }

  formatTimeTaken(timeTaken: number): string {
    const duration = moment.duration(timeTaken);
    return `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
  }
}
