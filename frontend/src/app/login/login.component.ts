import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Doctor from 'src/app/models/doctor';
import Patient from 'src/app/models/patient';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  username: string = '';
  password: string = '';
  role: string = '';

  login() : void {
    if (this.username == "" || this.password == ""){
      alert("Niste uneli sve podatke");
      return;
    }
    if(this.role == "pacijent"){
      this.userService.loginPatient(this.username, this.password).subscribe((k: Patient) => {
        if (k) {
          localStorage.setItem("logged", k.korIme)
          this.router.navigate(["patientForm"])
        } 
        else {
          alert("Uneli ste pogresne podatke");
          return;
        }
      })} 
      else if(this.role == "lekar") {
        this.userService.loginDoctor(this.username, this.password).subscribe((k: Doctor) => {
          if (k) {
            localStorage.setItem("logged", k.korIme)
            this.router.navigate(["doctorForm"])
          }  
          else {
            alert("Uneli ste pogresne podatke");
            return;
        }
        })
      }
  }
  
  back() {
    this.router.navigate([""])
  }

  registerRedirect() { 
    this.router.navigate(["registerPatient"]) 
  }
  
}
