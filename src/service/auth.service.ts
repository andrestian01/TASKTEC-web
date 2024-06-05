// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/graphql'; // URL de tu API GraphQL
  private user: any = null;

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<AuthResponse> {
    const mutation = `
      mutation Register($username: String!, $password: String!) {
        register(username: $username, password: $password) {
          token
          user {
            id
            username
          }
        }
      }
    `;
    const variables = { username, password };

    return this.http.post<{ data: { register: AuthResponse } }>(this.apiUrl, { query: mutation, variables }).pipe(
      map(response => response.data.register),
      catchError(error => {
        console.error('Error during registration:', error);
        return throwError('Could not register; please try again later.');
      })
    );
  }

  login(username: string, password: string): Observable<AuthResponse> {
    const mutation = `
      mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
          user {
            id
            username
          }
        }
      }
    `;
    const variables = { username, password };
    return this.http.post<{ data: { login: AuthResponse } }>(this.apiUrl, { query: mutation, variables }).pipe(
      map(response => response.data.login),
      catchError(error => {
        console.error('Error during login:', error);
        return throwError('Could not login; please try again later.');
      })
    );
  }

  saveToken(token: string, username: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify({ username }));
    this.user = { username };
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.user = null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUsername(): string {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user).username : '';
  }
  
  
}
