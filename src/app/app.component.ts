import { Component } from '@angular/core';
import { gql } from 'apollo-angular';

const TASKS_QUERY = gql`
  query {
    tasks {
      id
      title
      description
      deadline
      completed
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  tasks: any;

  constructor() {}

  
}
