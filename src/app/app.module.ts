import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InMemoryCache } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskListComponent } from './task-list-component/task-list-component.component';

@NgModule({
  declarations: [AppComponent, TaskListComponent, TaskAddComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const http = httpLink.create({
          uri: 'http://localhost:4000/graphql',
        });

        const ws = new WebSocketLink({
          uri: `ws://localhost:4000/graphql`,
          options: {
            reconnect: true,
          },
        });

        return {
          cache: new InMemoryCache(),
          link: ws.concat(http),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
