import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Patient from '../models/patient';
import { UserService } from '../services/user.service';
import Doctor from '../models/doctor';


@Component({
  selector: 'app-patients-doctors',
  templateUrl: './patients-doctors.component.html',
  styleUrls: ['./patients-doctors.component.css']
})
export class PatientsDoctorsComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }
   
  patient: Patient;
  location: string = "http://localhost:4000/public/"

  ngOnInit(): void {
    let logged = localStorage.getItem("logged");
    if(!logged){if(!this.patient)this.router.navigate([''])}
    this.userService.getPatient(logged).subscribe((p: Patient) => {
      if(!p){localStorage.clear();this.router.navigate([''])}
      this.patient = p;
    })
    this.userService.getDoctors().subscribe((data: Doctor[])=>{
      this.doctors = data;
    })
  }

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }
  
  doctors:Array<Doctor> = [];
  searchIme:string;
  searchPrezime:string;
  searchSpec:string;
  searchOgranak:string; 

  search(){
    this.userService.getDoctors().subscribe((data: Doctor[])=>{
      this.doctors = data;
      if(this.searchIme != undefined){
        this.doctors = this.doctors.filter(x => this.searchIme.charAt(0).toUpperCase() + this.searchIme.slice(1) == x.ime);
      }
      if(this.searchPrezime != undefined){
        this.doctors = this.doctors.filter(x => this.searchPrezime.charAt(0).toUpperCase() + this.searchPrezime.slice(1) == x.prezime);
      }
      if(this.searchSpec != undefined){
        this.doctors = this.doctors.filter(x => x.specijalizacija == this.searchSpec);
      }
      if(this.searchOgranak != undefined){
        this.doctors = this.doctors.filter(x => this.searchOgranak.charAt(0).toUpperCase() + this.searchOgranak.slice(1) == x.ogranak);
      }
    })
  }

  reset(){
    this.userService.getDoctors().subscribe((data: Doctor[])=>{
      this.doctors = data;
    })
    this.searchIme = undefined;
    this.searchPrezime = undefined;
    this.searchSpec = undefined;
  }

  selectDoctor(doctor:Doctor){
   localStorage.setItem("selectedDoctor", doctor.korIme);
   this.router.navigate(['/doctorCard'])
  }


  
}
