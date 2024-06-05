// models/task.model.ts
export interface Task {
  id?: string;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  completedAt?: string;
  timeTaken: number;  // Tiempo en milisegundos
  createdAt?: string; // Agregar la propiedad createdAt
    category: string;
  imageURL?: string; 
  documentURL?: string; 
  }
  

