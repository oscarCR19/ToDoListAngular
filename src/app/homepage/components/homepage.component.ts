import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';



interface Tasks {
  id:string;
  description:string;
  user: string;
  state:string;
  initDate:Date;
  daysOld:number;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit,AfterViewInit {
  userName:any;
  userId:any;
  userCurrentTasks: Tasks []=[];
  userMadeTasks: Tasks []=[];
  selectedOptions: string[] = [];
  description!:string;
  previousUrl!: "/login";

  displayedColumns: string[] = ['Posición', 'Descripción'];

  
  constructor(
    private router: Router,
    private tasksService:TasksService,
 
   ) {
}
  ngAfterViewInit(): void {
    // esto es necesario para hacer recargas de refrescamiento
  }

  //Aqui se obtienen las tareas y se valida si hay session  activa
  ngOnInit(): void {
    this.getTasks();  
    if(sessionStorage.length>1){
      this.userName=sessionStorage.getItem("sessionName");
      this.userId=sessionStorage.getItem("sessionId");
     
     
    }else{
      this.router.navigate(['/error-404']);
      console.log("Error");
    };

    //este codigo permite que cuando se retroceda a login la session se limpie por temas de seguridad
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url;
        if(currentRoute==='/login'){
          sessionStorage.clear();
        }}
      });

    

  }

  
  getTasks(){
    var user={user:sessionStorage.getItem("sessionId")};
    this.tasksService.getTask(user).subscribe((data:any) =>{
      if(data.length>0){
        for(let i =0;i<data.length;i++){
          //calcular los dias que han pasado
          const date1 = new Date(data[i].initDate);
          const date2 = new Date();
          const diffInMs = date2.getTime() - date1.getTime();
          const diffInDays =Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
          
          let task: Tasks = { 
            id: data[i]._id,
            description: data[i].description,
            user:data[i].user,
            state:data[i].state,
            initDate:data[i].initDate,
            daysOld:diffInDays
          };
          
          if(data[i].state==="activa"){
            this.userCurrentTasks.push(task);
           }else{
            this.userMadeTasks.push(task);
          }
          
        }
      }
      
     });
     
  };

 

 
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  addtask(){
    let date: Date = new Date();
    var dateTask=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    var task={description:this.description,user:sessionStorage.getItem("sessionId"),state:"activa",initDate:dateTask}
   
    this.tasksService.addTask(task).subscribe((data:any) =>{
      location.reload(); //este codigo recarga la pagina cada vez que se borra una tarea
     });
    
    
  
  }



  deleteCurrentTask(task:Tasks){
    this.tasksService.deleteTask(task).subscribe((data:any) =>{
      location.reload(); //este codigo recarga la pagina cada vez que se borra una tarea
    });
}

deleteMadeTask(task:Tasks){
  this.tasksService.deleteTask(task).subscribe((data:any) =>{
    location.reload(); //este codigo recarga la pagina cada vez que se borra una tarea
  });

}
CompletedTask(task:Tasks){
  task.state="no-activa";
  this.tasksService.updateTask(task).subscribe((data:any) =>{
    location.reload(); //este codigo recarga la pagina cada vez que se borra una tarea
  });
}


//fin
}

