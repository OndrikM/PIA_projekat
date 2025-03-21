import { Component, OnInit } from '@angular/core';
import Doctor from '../models/doctor';
import { UserService } from '../services/user.service';
import Patient from '../models/patient';
import { Router } from '@angular/router';
import Examination from '../models/examination';
import Appointment from '../models/appointment';

@Component({
  selector: 'app-doctors-card',
  templateUrl: './doctors-card.component.html',
  styleUrls: ['./doctors-card.component.css']
})
export class DoctorsCardComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) { }
  
  patient: Patient;
  doctor:Doctor;
  exams:Array<Examination>=new Array<Examination>();

  ngOnInit(): void {
    let logged = localStorage.getItem("logged");
    if(!logged){if(!this.patient)this.router.navigate([''])}
    this.userService.getPatient(logged).subscribe((p: Patient) => {
      if(!p){localStorage.clear();this.router.navigate([''])}
      this.patient = p;
      this.userService.getDoctor(localStorage.getItem('selectedDoctor')).subscribe((d:Doctor)=>{
        this.doctor = d; 
        for(let i=0;i<this.doctor.pregledi.length;i++){
          this.userService.getExamination(this.doctor.pregledi[i]).subscribe((e:Examination)=>{
            this.exams.push(e);
          })
        }
      })
    })
  }

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

  back(){
    localStorage.removeItem('selectedDoctor')
    this.router.navigate(['/patientDoctor'])
  }

  exam:Examination;
  examSelected:boolean = false;
  formSelected:boolean = false;
  time:string;
  date:string;

  examCheck(exam:Examination){
    if(exam==this.exam)return 'rgba(189, 185, 185, 0.582)';
    else return 'white'
  }
  
  selectExam(exam:Examination){
    this.examSelected=true;
    this.exam = exam;
  }

  form(){
    this.formSelected = true;
    this.userService.getAppointments().subscribe((result:Array<Appointment>)=>{
      this.appointments = result;
    })
  }

  calendar(){
    this.formSelected = false;
  }

  appointments:Array<Appointment>;

  schedule(){
    if(this.date==undefined || this.time==undefined){
      alert("Niste uneli datum ili vreme");
      return;
    }
    else{
        if(this.checkToday(this.date,this.time)){
          if(this.checkWorkingTime(this.date,this.time)){
          if(this.checkPatientSchedule(this.date,this.time)){
            if(this.checkDoctorSchedule(this.date,this.time)){
              this.userService.newAppointment(this.patient.korIme,this.doctor.korIme,this.date,this.time,this.exam.trajanje,this.exam.naziv).subscribe((result)=>{
                if(result['message']=="ok"){
                  this.formSelected = false;
                  this.examSelected = false;
                  alert("Uspesno ste zakazali pregled");
                  this.router.navigate(['/patientDoctor']);
                }
                else{
                  alert("Greska pri zakazivanju pregleda");
                }
              })        
            }
          }
        }
      }
    }
  }

  checkWorkingTime(date:string,time:string){
    let fullDate = new Date(date+" "+time);
    let dateS=new Date(date+" 08:00");
    let dateE=new Date(date+" 16:00");
    if((fullDate>=dateS) && (fullDate<=dateE)){
      return true;
    }
    alert("Unesite termin u okviru radnog vremena");
    return false;
  }

  checkToday(date:string,time:string){
    let today = new Date();
    let dateD = new Date(date+" "+time);
    if(dateD>today){
      return true;
    }
    alert("Neispravan datum i vreme");
    return false;
  }

  compareDates(date1:string,time1:string,date2:string,time2:string,time3:number){
    let fullDate1 = new Date(date1+" "+time1);
    let fullDate2 = new Date(date2+" "+time2);
    let fullDate3 =new Date(date2+" "+time2);
    fullDate3.setMinutes(fullDate2.getMinutes()+time3);
    if((fullDate1>=fullDate2) && (fullDate3>=fullDate1)){
      return true;
    }
    return false;
  }

  checkPatientSchedule(date:string,time:string){
    for(let i=0;i<this.appointments.length;i++){
      if(this.appointments[i].pacijent == this.patient.korIme){
        if(this.compareDates(this.date,this.time,this.appointments[i].datum,this.appointments[i].vreme,this.appointments[i].trajanje)){
          alert("Vec ste zakazali pregled u tom terminu");
          return false;
        }
      }
    }
    return true;
  
  }

  checkDoctorSchedule(date:string,time:string){
    for(let i=0;i<this.appointments.length;i++){
      if(this.appointments[i].lekar == this.doctor.korIme){
        if(this.compareDates(this.date,this.time,this.appointments[i].datum,this.appointments[i].vreme,this.appointments[i].trajanje)){
          alert("Lekar je vec zauzet u tom terminu");
          return false;
        }
      }
    }
    return true;

  }

}
