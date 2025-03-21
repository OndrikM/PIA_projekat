import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Manager from '../models/manager';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
  }

  username: string = '';
  password: string = '';
  
  login() {
    if (this.username == "" || this.password == "") {
      alert("Niste uneli sve podatke");
      return;
    }else{
    this.userService.loginManager(this.username, this.password).subscribe((m:Manager) => {
      if (m) {
        localStorage.setItem("logged", m.korIme)
        this.router.navigate(["managerUsers"])
      } else {
        alert("Uneli ste pogresne podatke");
        return;
      }
    })}
  }

  back(){
    this.router.navigate([""])
  }
}
