import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  isLogged:boolean=false;
  currentUser:any;

  currentSession(user:any){
    this.isLogged=true;
    this.currentUser=user;
  }

  logOut(){
    this.currentSession(false);
    this.isLogged=false;
  }

}
