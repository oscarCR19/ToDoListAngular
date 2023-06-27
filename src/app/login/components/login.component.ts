import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users/users.service';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  user!:JSON;
  typePassword='password';
  //Formulario de Login
  constructor(
    private userService:UsersService,
    private router: Router,
    ) {

  }
  
  //Este codigo le da funcionalidad al boton de ver la contraseña
  viewPassword(){
    if(this.typePassword==='password'){
      this.typePassword='text';
    }else if (this.typePassword==='text') {
      this.typePassword='password'
      
    }
  }

  ngOnInit(): void {
    
  }

   async login() {

    var loginData={email:this.username, passw:this.password}

    this.userService.login(loginData).subscribe((data:any)=>{
      if(data.length ===1){
        sessionStorage.setItem("sessionName",data[0].name);
        sessionStorage.setItem("sessionId",data[0]._id);
        this.router.navigate(['/homepage']);
      }else{
        console.log("error en el login");
      }
    });

   

  }

 

  //Captura de errores para mostrar  en pantalla

  errorCode(code: string) {
    switch (code) {
      case 'auth/wrong-password':
        return 'Contraseña incorrecta.';
      case 'auth/user-not-found':
        return 'Email incorrecto.';
      case 'auth/invalid-email':
        return 'Email con formato incorrecto';
      case 'auth/internal-error':
        return 'Ingrese una contraseña';
      default:
        return 'Error Desconocido!';
    }
  }
}
