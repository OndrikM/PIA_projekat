import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Doctor from 'src/app/models/doctor';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private userService: UserService, private router: Router ) {}

  ngOnInit(): void {
    this.userService.getDoctors().subscribe((data: Doctor[])=>{
      this.doctors = data;
    })
  }

  doctors:Array<Doctor> = [];
  searchIme:string;
  searchPrezime:string;
  searchSpec:string; 

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

}
