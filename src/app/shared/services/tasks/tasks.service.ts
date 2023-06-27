import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor( private http:HttpClient) { }

  getTask(data:any){
    return this.http.post('http://localhost:5000/tasks/get/',data);
  }

  deleteTask(data:any){
    return this.http.post('http://localhost:5000/tasks/delete/',data);
  }

  addTask(data:any){
    return this.http.post('http://localhost:5000/tasks/add/',data);
  }
  updateTask(data:any){
    return this.http.post('http://localhost:5000/tasks/update/',data);
  }

}
