import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/shared/services/users/users.service';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

//Creación de clase para el formulario de registrar usuario
export class RegistrarComponent implements OnInit {

  username!: string;
  password!: string;
  name!:string;
  user!:JSON;
  typePassword='password';

  constructor(
    private router: Router,
    private userService:UsersService) {
    
    
  }

  ngOnInit(): void {

  }

 
registrar() {
  var loginData={email:this.username, passw:this.password}

  this.userService.login(loginData).subscribe((data:any)=>{
    if(data.length ===1){
      console.log("Error usuario ya registrado");
    }else{
      var registerData={email:this.username, passw:this.password,name:this.name}
      this.userService.register(registerData).subscribe((data:any)=>{
      this.router.navigate(["/login"]);
      });
    }
  });
}

  viewPassword(){
    if(this.typePassword==='password'){
      this.typePassword='text';
    }else if (this.typePassword==='text') {
      this.typePassword='password'
      
    }
  }


  //Captura de errores para mostrar en pantalla

  firebaseError(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Dirección de correo electrónico ya está en uso.';
      case 'auth/weak-password':
        return 'La contraseña debe tener minimo 6 caracteres.';
      case 'auth/invalid-email':
        return 'Email en formato incorrecto';
      case 'auth/internal-error':
        return 'Por favor digite una contraseña';
      default:
        return 'Error Desconocido';
    }
  }
}


