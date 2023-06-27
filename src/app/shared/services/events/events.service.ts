import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor( private http:HttpClient) { }

  getEvents(data:any){
    return this.http.post('http://localhost:5000/events/get/',data);
  }

  insertEvent(data:any){
    return this.http.post('http://localhost:5000/events/add/',data);
  }
}
