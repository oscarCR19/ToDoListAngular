import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http:HttpClient) { }

  getUsers(){
    return this.http.get('http://localhost:5000/users/get');
  }

  login(loginData:any){
    return this.http.post('http://localhost:5000/users/login/',loginData);
  }
  register(registerData:any){
    return this.http.post('http://localhost:5000/users/add/',registerData);
  }

}
