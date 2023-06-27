import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



//Routing de los componentes
const routes: Routes = [
  {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'},

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
  },
  {
    path: 'error-404',
    loadChildren: () => import('./error404/error404.module').then(m => m.Error404Module)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
