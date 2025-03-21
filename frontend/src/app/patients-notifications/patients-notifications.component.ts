import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Patient from '../models/patient';
import { UserService } from '../services/user.service';
import Message from '../models/message';

@Component({
  selector: 'app-patients-notifications',
  templateUrl: './patients-notifications.component.html',
  styleUrls: ['./patients-notifications.component.css']
})
export class PatientsNotificationsComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }
   
  patient: Patient;
  messages:Array<Message>=new Array<Message>();

  ngOnInit(): void {
    let logged = localStorage.getItem("logged");
    if(!logged){if(!this.patient)this.router.navigate([''])}
    this.userService.getPatient(logged).subscribe((p: Patient) => {
      if(!p){localStorage.clear();this.router.navigate([''])}
      this.patient = p;
      this.userService.getMessages(logged).subscribe((m: Array<Message>) => {
        this.messages = m;
        this.selectedMessage=null;
      })
    })
  }

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }
  
  statusCheck(mes:Message){
    if(mes.status=="Neprocitano")return 'rgba(189, 185, 185, 0.582)';
    else return 'white'
  }

  selectedMessage:Message;

  delete(m:Message){
    this.userService.deleteMessage(this.patient.korIme,m.naslov,m.tekst).subscribe((res) => {
     this.ngOnInit();
    })
  }

  open(m:Message){
     this.selectedMessage=m;
  }

  close(){
    if(this.selectedMessage.status=="Neprocitano"){
    this.userService.readMessage(this.patient.korIme,this.selectedMessage.naslov,this.selectedMessage.tekst).subscribe((res) => {
      this.ngOnInit();
    })
  }else{
    this.selectedMessage=null;
  }
  }

  
  

}
