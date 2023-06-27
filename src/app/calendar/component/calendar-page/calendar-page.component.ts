import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EventsService } from 'src/app/shared/services/events/events.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

moment.locale('es');
interface Day {
  date: () => string;
}


interface Event {
  date: moment.Moment;
  title: string;
}

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  month!: string;
  weeks: Day[][] = [];
  selectedDay!: moment.Moment;
  events: Event[] = [];
  newEventTitle!: string;
  selectedEvent!: Event;
  currentWeek: Day[] = [];
  event!:Event;
  constructor(private location:Location,
    private eventService:EventsService,
    private router:Router){

  }

  ngOnInit() {
    if(sessionStorage.length===0){
      this.router.navigate(['/error-404'])
    }
    this.getEvent();
    this.selectedDay = moment();
    this.generateCalendar(this.selectedDay);
  }

  generateCalendar(date: moment.Moment) {
    this.weeks = [];

    const startOfMonth = moment(date).startOf('month');
    const endOfMonth = moment(date).endOf('month');

    const daysInMonth = endOfMonth.date();
    
    

    for (let i = 1; i <= daysInMonth; i++) {
      const day = moment(startOfMonth).add(i -1, 'days');
      if(i==1){
        for(let i=0;i<startOfMonth.day();i++){
          this.currentWeek.push({date:()=>"0"});
     }
        this.currentWeek.push({ date: () => day.date().toString() });
        
      }else{
        this.currentWeek.push({ date: () => day.date().toString() });
      
      }
      if (day.weekday() === 6 || i === daysInMonth) {
        this.weeks.push(this.currentWeek);
        this.currentWeek = [];
      }
    }
   
    moment.locale('es');
    this.month = moment(date).format('MMMM YYYY');
    //this.selectedEvent = null;
  }

  previousMonth() {
    this.selectedDay = moment(this.selectedDay).subtract(1, 'month');
    this.generateCalendar(this.selectedDay);
  }

  nextMonth() {
    this.selectedDay = moment(this.selectedDay).add(1, 'month');
    this.generateCalendar(this.selectedDay);
  }

  isToday(day: Day) {
    return moment().isSame(this.selectedDay.clone().date(parseInt(day.date())));
  }

  isSelected(day: Day) {
    return this.selectedDay.isSame(this.selectedDay.clone().date(parseInt(day.date())));
    
  }

  selectDay(day: Day) {
    this.selectedDay = this.selectedDay.clone().date(parseInt(day.date()));
    
    //this.selectedEvent =;
  }

  hasEvent(day: Day) {
    return this.events.some(event => event.date.isSame(this.selectedDay.clone().date(parseInt(day.date()))));
  }

  getEvents(day: Day) {
    return this.events.filter(event => event.date.isSame(this.selectedDay.clone().date(parseInt(day.date()))));
  }

  addEvent() {
    const newEvent: Event = {
      date: moment(this.selectedDay),
      title: this.newEventTitle
    };
    var nwEvent={user:sessionStorage.getItem("sessionId"),description:this.newEventTitle,initDate:moment(this.selectedDay)};
    this.eventService.insertEvent(nwEvent).subscribe((data:any) =>{
      location.reload(); //este codigo recarga la pagina cada vez que se borra una tarea
      
      
    });
    this.events.push(newEvent);
    this.newEventTitle = '';
    console.log(newEvent);
  }

  reloadPage(){
    window.location.reload();
  }

  deleteEvent(event: Event) {
    const eventToDelete = this.events.indexOf(event);
    if (eventToDelete !== -1) { 
    this.events.splice(eventToDelete, 1);
    }
    this.reloadPage();
  }

  getEvent(){
    var user={user:sessionStorage.getItem("sessionId")};
    this.eventService.getEvents(user).subscribe((data:any) =>{
      //location.reload(); //este codigo recarga la pagina cada vez que se borra una tarea
      for(let i=0;i<Object.keys(data).length;i++){
        const newEvent: Event = {
          date: moment(data[i].initDate),
          title: data[i].description
        };
        this.events.push(newEvent);
        console.log(newEvent);
       }
       
  });

  
  }
  



}

