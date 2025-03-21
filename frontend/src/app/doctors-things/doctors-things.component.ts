import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Doctor from '../models/doctor';
import { UserService } from '../services/user.service';
import Examination from '../models/examination';
import Appointment from '../models/appointment';

@Component({
  selector: 'app-doctors-things',
  templateUrl: './doctors-things.component.html',
  styleUrls: ['./doctors-things.component.css']
})
export class DoctorsThingsComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }
  
  doctor: Doctor;
  freeDays:Array<Appointment>=new Array<Appointment>();
     
  ngOnInit(): void {
    let logged = localStorage.getItem("logged");
    if(!logged){if(!this.doctor)this.router.navigate([''])}
    this.userService.getDoctor(logged).subscribe((d: Doctor) => {
      if(!d){localStorage.clear();this.router.navigate([''])}
      this.doctor = d;
      this.userService.getExaminations().subscribe((data: Array<Examination>) => {
        this.nonExams=data;
        for(let p of this.doctor.pregledi){
          for(let e of this.nonExams){
            if(p==e.naziv){
              this.nonExams.splice(this.nonExams.indexOf(e),1)
            }
          }
        }
        this.userService.getDoctorsAppointments(this.doctor.korIme).subscribe((data: Array<Appointment>) => {
          for(let d of data){
            if(d.tip=="Slobodan dan" || d.tip=="Godisnji odmor"){
              this.freeDays.push(d)
            }
          }
        })
        this.freeDays.sort((a,b)=>{
          let dateA=new Date(a.datum+" "+a.vreme);
          let dateB=new Date(b.datum+" "+b.vreme);
          return dateA.getTime()-dateB.getTime();
        })
      })
    })
  }

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

  beginR:string;
  endR:string;

  setHoliday(){
   let take=true;
   let beginRDate=new Date(this.beginR)
   let endRDate=new Date(this.endR)
   let test=new Date(this.beginR)
   let s:string;
   this.userService.getDoctorsAppointments(this.doctor.korIme).subscribe((data: any) => {
   for(let i=test;i<=endRDate;i.setDate(i.getDate()+1)){
    if(i.getDate()<10 && (i.getMonth()+1)<10)s=i.getFullYear()+"-0"+(i.getMonth()+1)+"-0"+i.getDate()
    else if(i.getDate()<10 && (i.getMonth()+1)>=10)s=i.getFullYear()+"-"+(i.getMonth()+1)+"-0"+i.getDate()
    else if(i.getDate()>=10 && (i.getMonth()+1)<10)s=i.getFullYear()+"-0"+(i.getMonth()+1)+"-"+i.getDate()
    else s=i.getFullYear()+"-"+(i.getMonth()+1)+"-"+i.getDate()
    for(let j=0;j<data.length;j++){
      if(data[j].datum==s){
        take=false;
        break;
      }
    }
  }
  if(take==true){
    for(let i=beginRDate;i<=endRDate;i.setDate(i.getDate()+1)){
      let s=i.getFullYear()+"-"+(i.getMonth()+1)+"-"+i.getDate()
      this.userService.newAppointment("",this.doctor.korIme,s,"08:00",480,"Godisnji odmor").subscribe((data:any)=>{})
    }
    alert("Uspesno ste postavili godisnji odmor")
    this.beginR=undefined;
    this.endR=undefined;
  }
  else{alert("Imate zakazane preglede za taj period")}
  })
  }

  freeDay:string;

  setDayOff(){
    let take=true;
    this.userService.getDoctorsAppointments(this.doctor.korIme).subscribe((data: any) => {
      for(let i=0;i<data.length;i++){
        if(data[i].datum==this.freeDay){
          take=false;
          break;
        } 
      }
      
      if(take==false){
        alert("Imate zakazane preglede za taj dan")
      }
      else{
        this.userService.newAppointment("",this.doctor.korIme,this.freeDay,"08:00",480,"Slobodan dan").subscribe((data:any)=>{
          if(data['message']='ok'){
            alert("Uspesno ste postavili slobodan dan")
            this.freeDay=undefined;
          }
        })
      }
    })
  }

  nonExams:Array<Examination>=new Array<Examination>();
  selectedExam:string;

  newExamReq(){
    this.userService.newExamReq(this.doctor.korIme,this.selectedExam).subscribe((data:any)=>{
      if(data['message']='ok'){
        alert("Uspesno ste poslali zahtev")
        this.selectedExam=undefined;
        this.ngOnInit();
      }else{
        alert("Greska pri slanju zahteva")
      }
    })
  }
  
 
  

}
