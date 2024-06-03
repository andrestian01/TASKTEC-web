import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Task } from './moels/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:4000/graphql'; // URL de tu API GraphQL

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    const query = `
      query {
        tasks {
          id
          title
          description
          deadline
          completed
          category
        }
      }
    `;
    return this.http.post<{ data: { tasks: Task[] } }>(this.apiUrl, { query }).pipe(
      map(response => response.data.tasks)
    );
  }

  addTask(newTask: Task): Observable<Task> {
    const mutation = `
      mutation AddTask($title: String!, $description: String!, $deadline: String!, $category: String!) {
        addTask(title: $title, description: $description, deadline: $deadline,category: $category) {
          id
          title
          description
          deadline
          completed
          category
        }
      }
    `;
    
    const variables = {
      title: newTask.title,
      description: newTask.description,
      deadline: newTask.deadline,
      category: newTask.category
    };
  
    return this.http.post<{ data: { addTask: Task } }>(this.apiUrl, { query: mutation, variables }).pipe(
      map(response => response.data.addTask),
      catchError(error => {
        console.error('Error adding task:', error);
        return throwError('Could not add task; please try again later.');
      })
    );
  }
  

  updateTaskStatus(task: Task): Observable<Task> {
    const mutation = `
      mutation {
        updateTaskStatus(id: "${task.id}", completed: ${task.completed}) {
          id
          title
          description
          deadline
          completed
          category
        }
      }
    `;
    return this.http.post<{ data: { updateTaskStatus: Task } }>(this.apiUrl, { query: mutation }).pipe(
      map(response => response.data.updateTaskStatus),
      catchError(error => {
        console.error('Error updating task status:', error);
        return throwError('Could not update task status; please try again later.');
      })
    );
  }

  deleteTask(task: Task): Observable<Task> {
    const mutation = `
      mutation {
        deleteTask(id: "${task.id}") {
          id
          title
          description
          deadline
          completed
          category
        }
      }
    `;
    return this.http.post<{ data: { deleteTask: Task } }>(this.apiUrl, { query: mutation }).pipe(
      map(response => response.data.deleteTask),
      catchError(error => {
        console.error('Error deleting task:', error);
        return throwError('Could not delete task; please try again later.');
      })
    );
  }
}
