import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Patient from '../models/patient';
import { UserService } from '../services/user.service';
import Appointment from '../models/appointment';
import Examination from '../models/examination';
import Doctor from '../models/doctor';
import Report from '../models/report';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import {jsPDF} from 'jspdf';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-patients-checks',
  templateUrl: './patients-checks.component.html',
  styleUrls: ['./patients-checks.component.css']
})
export class PatientsChecksComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }
   
  patient: Patient;
  appointments:Array<Appointment>=new Array<Appointment>()
  doctors:Array<Doctor>=new Array<Doctor>()
  reports:Array<Report>=new Array<Report>()
  doctorsRep:Array<Doctor>=new Array<Doctor>()
  message:string = ""
  
  ngOnInit(): void {
    let logged = localStorage.getItem("logged");
    if(!logged){if(!this.patient)this.router.navigate([''])}
    this.userService.getPatient(logged).subscribe((p: Patient) => {
      if(!p){localStorage.clear();this.router.navigate([''])}
      this.patient = p;
       this.userService.getPatientsAppointments(logged).subscribe((app: Array<Appointment>) =>{
        this.appointments = app;
        this.appointments.sort((a,b)=>{
          let dateA=new Date(a.datum+" "+a.vreme);
          let dateB=new Date(b.datum+" "+b.vreme);
          return dateA.getTime()-dateB.getTime();
        })
        this.userService.getDoctors().subscribe((doc: Array<Doctor>) =>{
         for(let i=0;i<this.appointments.length;i++){
          for(let d of doc){ 
           if(this.appointments[i].lekar==d.korIme){
            this.doctors.push(d);}
          }
         }  
         this.userService.getReports(logged).subscribe((rep: Array<Report>) =>{
          this.reports = rep;
          this.reports.sort((a,b)=>{
            let dateA=new Date(a.datum+" "+a.vreme);
            let dateB=new Date(b.datum+" "+b.vreme);
            return dateB.getTime()-dateA.getTime();
          })
          for(let r of this.reports){
            for(let d of doc){
              if(r.lekar==d.korIme){
                this.doctorsRep.push(d);
              }
            }
          }
         })
        })
      })
    })
}

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

  cancel(app:Appointment){
    this.userService.cancelAppointment(app).subscribe((message: string) => {
      this.message = "Pregled otkazan";
      this.ngOnInit();
    })
  }
  
  fileToSend:FormData;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = "https://localhost:4000/public/";

  generatePdf(r:Report,d:Doctor){
    var doc = new jsPDF();
    doc.setFontSize(40);
    doc.text('GreenMedic', 60, 20);
    doc.setFontSize(22);
    doc.text('Izveštaj o pregledu', 10, 40);
    doc.setFontSize(16);
    doc.text('Pacijent: '+this.patient.ime+' '+this.patient.prezime, 10, 50);
    doc.text('Doktor: '+d.ime+' '+d.prezime, 10,60);
    doc.text('Datum: '+r.datum, 10, 70);
    doc.text('Vreme: '+r.vreme, 10, 80);
    doc.text('Razlog dolaska: '+r.razlog, 10, 90);
    doc.text('Dijagnoza: '+r.dijagnoza, 10, 100);
    doc.text('Terapija: '+r.terapija, 10, 110);
    

    this.fileToSend = new FormData();
    this.fileToSend.append('fs', doc.output('blob'), 'report.pdf');
    this.userService.uploadImage(this.fileToSend).subscribe((message: string) => {
      this.value+=message;
    })


  }


}
