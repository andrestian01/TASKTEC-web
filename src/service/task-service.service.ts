// task-service.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Task } from '../app/moels/task.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:4000/graphql'; // URL de tu API GraphQL

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  getTasks(): Observable<Task[]> {
    const query = `
      query {
        tasks {
          id
          title
          description
          deadline
          completed
          timeTaken
          category
        }
      }
    `;
    const headers = this.getAuthHeaders();
    return this.http.post<{ data: { tasks: Task[] } }>(this.apiUrl, { query }, { headers }).pipe(
      map(response => response.data.tasks)
    );
  }

  // getTask(taskId: string): Observable<Task> {
  //   const query = `
  //     query GetTask($id: ID!) {
  //       task(id: $id) {
  //         id
  //         title
  //         description
  //         deadline
  //         completed
  //         timeTaken
  //         category
  //       }
  //     }
  //   `;
  //   const variables = { id: taskId };

  //   return this.http.post<{ data: { task: Task } }>(this.apiUrl, { query, variables }).pipe(
  //     map(response => response.data.task),
  //     catchError(error => {
  //       console.error('Error retrieving task:', error);
  //       return throwError('Could not retrieve task details; please try again later.');
  //     })
  //   );
  // }

  // updateTask(updatedTask: Task): Observable<Task> {
  //   const mutation = `
  //     mutation UpdateTask($id: ID!, $title: String!, $description: String!, $deadline: String!, $completed: Boolean!, $timeTaken: Int!, $category: String!) {
  //       updateTask(id: $id, title: $title, description: $description, deadline: $deadline, completed: $completed, timeTaken: $timeTaken, category: $category) {
  //         id
  //         title
  //         description
  //         deadline
  //         completed
  //         timeTaken
  //         createdAt
  //         category
  //       }
  //     }
  //   `;
    
  //   const variables = {
  //     id: updatedTask.id,
  //     title: updatedTask.title,
  //     description: updatedTask.description,
  //     deadline: updatedTask.deadline,
  //     completed: updatedTask.completed,
  //     timeTaken: updatedTask.timeTaken,
  //     category: updatedTask.category
  //   };
  
  //   const headers = this.getAuthHeaders();
  //   return this.http.post<{ data: { updateTask: Task } }>(this.apiUrl, { query: mutation, variables }, { headers }).pipe(
  //     map(response => response.data.updateTask),
  //     catchError(error => {
  //       console.error('Error updating task:', error);
  //       return throwError('Could not update task; please try again later.');
  //     })
  //   );
  // }

  addTask(newTask: Task): Observable<Task> {
    const mutation = `
      mutation AddTask($title: String!, $description: String!, $deadline: String!, $category: String!) {
        addTask(title: $title, description: $description, deadline: $deadline, category: $category) {
          id
          title
          description
          deadline
          completed
          timeTaken
          createdAt
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

    const headers = this.getAuthHeaders();
    return this.http.post<{ data: { addTask: Task } }>(this.apiUrl, { query: mutation, variables }, { headers }).pipe(
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
          timeTaken
          category
        }
      }
    `;
    const headers = this.getAuthHeaders();
    return this.http.post<{ data: { updateTaskStatus: Task } }>(this.apiUrl, { query: mutation }, { headers }).pipe(
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
          timeTaken
          category
        }
      }
    `;
    const headers = this.getAuthHeaders();
    return this.http.post<{ data: { deleteTask: Task } }>(this.apiUrl, { query: mutation }, { headers }).pipe(
      map(response => response.data.deleteTask),
      catchError(error => {
        console.error('Error deleting task:', error);
        return throwError('Could not delete task; please try again later.');
      })
    );
  }
}
