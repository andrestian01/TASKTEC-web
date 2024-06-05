// update-task.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/service/task-service.service';
import { Task } from '../moels/task.model';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  taskId: string | null = null; // Inicializa taskId como string o null

  updatedTask: Task = {
    id: '',
    title: '',
    description: '',
    deadline: '',
    completed: false,
    timeTaken: 0,
    category: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
  //   // Obtener el ID de la tarea de la URL
  //   this.taskId = this.route.snapshot.paramMap.get('id');
  //   if (this.taskId !== null) {
  //     // Obtener los detalles de la tarea existente usando el ID
  //     this.taskService.getTask(this.taskId).subscribe(
  //       (task: Task) => {
  //         // Rellenar el objeto updatedTask con los valores existentes de la tarea
  //         this.updatedTask = { ...task };
  //       },
  //       (error) => {
  //         console.error('Error retrieving task details:', error);
  //         // Manejo del error, puedes mostrar un mensaje al usuario o realizar otra acción
  //       }
  //     );
  //   } else {
  //     console.error('No task ID found in URL.');
  //     // Manejo del caso en el que no se encuentre el ID de la tarea en la URL
  //   }
  // }

  // updateTask(): void {
  //   this.taskService.updateTask(this.updatedTask).subscribe(
  //     () => {
  //       // La tarea se actualizó correctamente, redirige a la lista de tareas
  //       this.router.navigate(['/tasks']);
  //     },
  //     (error) => {
  //       console.error('Error updating task:', error);
  //       // Manejo del error, puedes mostrar un mensaje al usuario o realizar otra acción
  //     }
  //   );
   }
}