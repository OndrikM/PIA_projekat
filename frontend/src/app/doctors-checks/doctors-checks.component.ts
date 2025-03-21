import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Doctor from '../models/doctor';
import { UserService } from '../services/user.service';
import { EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import Appointment from '../models/appointment';
import Patient from '../models/patient';
import Report from '../models/report';

@Component({
  selector: 'app-doctors-checks',
  templateUrl: './doctors-checks.component.html',
  styleUrls: ['./doctors-checks.component.css']
})
export class DoctorsChecksComponent implements OnInit {
  
  constructor(private userService:UserService,private router:Router) { }
  
  doctor: Doctor;
  appointments:Array<Appointment>=new Array<Appointment>();
  patients:Array<Patient>=new Array<Patient>();
  checks:boolean=true;
     
  ngOnInit(): void {
    let logged = localStorage.getItem("logged");
    if(!logged){if(!this.doctor)this.router.navigate([''])}
    this.userService.getDoctor(logged).subscribe((d: Doctor) => {
      if(!d){localStorage.clear();this.router.navigate([''])}
      this.doctor = d;
      this.userService.getDoctorsAppointments(logged).subscribe((app:Array<Appointment>)=>{
        for(let a of app){
          if((a.tip!="Godisnji odmor") && (a.tip!="Slobodan dan")){
            this.appointments.push(a);
          }
        }
        this.appointments.sort((a,b)=>{
          let dateA=new Date(a.datum+" "+a.vreme);
          let dateB=new Date(b.datum+" "+b.vreme);
          return dateA.getTime()-dateB.getTime();
        })
        for(let a of this.appointments){
          this.userService.getPatient(a.pacijent).subscribe((p:Patient)=>{
            this.patients.push(p);
          })
        }
      })
    })
  }

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

  appCheck(app:Appointment){
    if(app==this.selectedApp)return 'rgba(189, 185, 185, 0.582)';
    else return 'white'
  }

  reason:string;
  selectedApp:Appointment;

  cancel(app:Appointment){
    this.checks=false;
    this.patientChecked=false;
    this.selectedApp=app;
  }

  cancelConfirm(){
    this.checks=true;
    this.userService.cancelAppointment(this.selectedApp).subscribe((message: string) => {
      this.userService.newMessage("Otkazan pregled",this.selectedApp.pacijent,this.reason).subscribe((data)=>{
        if(data['message']=='ok'){
          alert("Pregled otkazan");
        }else{
          alert("Greska pri otkazivanju pregleda")
        }
      })
      this.ngOnInit();
    })
  }

  patientChecked:boolean=false;
  selectedPatient:Patient;
  selectedPatientsAppointments:Array<Appointment>=new Array<Appointment>();
  selectedPatientsReports:Array<Report>=new Array<Report>();
  doctorsApp:Array<Doctor> = new Array<Doctor>();
  doctorsRep:Array<Doctor> = new Array<Doctor>();
  
  patientsCard(app:Appointment,index:number){
    this.patientChecked=true;
    this.selectedPatient=this.patients[index];
    this.selectedApp=app;
    this.userService.getPatientsAppointments(this.selectedPatient.korIme).subscribe((a:Array<Appointment>)=>{
      this.selectedPatientsAppointments=a;
      this.userService.getReports(this.selectedPatient.korIme).subscribe((r:Array<Report>)=>{
        this.selectedPatientsReports=r;
        for(let a of this.selectedPatientsAppointments){
          this.userService.getDoctor(a.lekar).subscribe((d:Doctor)=>{
          this.doctorsApp.push(d);
       })
       for(let r of this.selectedPatientsReports){
          this.userService.getDoctor(r.lekar).subscribe((d:Doctor)=>{
          this.doctorsRep.push(d);
        })
       }
      } 
      })
    })
   
  }

  close(){
    this.patientChecked=false;
  }

  coming:string;
  diagnosis:string;
  therapy:string;
  control:string;

  appToRep(app:Appointment,index:number){
    if(this.selectedPatientsAppointments[index].lekar!=this.doctor.korIme){
      alert("Nije vas pregled");
    }else{
      this.selectedApp=app;
    }
  }
  
  save(){
    let date=new Date();
    let appDate=new Date(this.selectedApp.datum+" "+this.selectedApp.vreme);
    if(appDate>date){
      this.userService.newReport(this.selectedApp.pacijent,this.selectedApp.lekar,this.selectedApp.datum,this.selectedApp.vreme,this.diagnosis,this.therapy,this.control,this.doctor.specijalizacija,this.coming).subscribe((data)=>{
        if(data['message']=='ok'){
          this.userService.cancelAppointment(this.selectedApp).subscribe((data)=>{
            if(data['message']=='ok'){
              alert("Izvestaj sacuvan");
              this.selectedApp=undefined;
              this.coming=undefined;
              this.diagnosis=undefined;
              this.therapy=undefined;
              this.control=undefined;
              this.patientChecked=false;
              this.ngOnInit();
            }else{
              alert("Greska pri cuvanju izvestaja");
            }
          })
        }else{
          alert("Greska pri cuvanju izvestaja")
        }
      })
    }else{
      alert("Ne mozete uneti izvestaj za pregled koji jos nije poceo");
    }   
  }

}
