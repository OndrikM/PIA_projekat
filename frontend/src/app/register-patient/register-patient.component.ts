import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Patient from '../models/patient';
import Request from '../models/request';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {
 
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
  }
  
  regexPass=new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=^[a-zA-Z])(?!.*(.)\1{1}).{8,14}/)
  regexEmail=new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)

  username:string;
  password:string;
  passwordConfirm:string;
  name:string;
  surname:string;
  adress:string;
  telephone:string;
  email:string;

  fileToSend:FormData
  picture:string;

  uploadImage(event){
    const file=event.target.files[0]
    const reader=new FileReader()
    
    reader.onload=()=>{
      const pic=new Image()
      pic.onload=()=>{
        if(pic.width>300 || pic.height>300 || pic.width<100 || pic.height<100){
          alert("Slika mora biti najmanje 100x100 i najvise 300x300");
        }
        else{
          this.fileToSend=new FormData()
          this.fileToSend.append('fs',file)
          this.userService.uploadImage(this.fileToSend).subscribe((name:string)=>{
            this.picture=name;
          })
        }
      }
      pic.src=reader.result as string
    }
    reader.readAsDataURL(file)
  }

  back(){
    this.router.navigate(['']);
  }

  loginRedirect(){
    this.router.navigate(['login']);
  }

  register(){
    if(this.username==undefined || this.password==undefined || this.passwordConfirm==undefined || this.name==undefined || this.surname==undefined || this.adress==undefined || this.telephone==undefined || this.email==undefined){
      alert("Sva polja moraju biti popunjena");
    }
    else{
      if(!this.regexPass.test(this.password)){alert("Lozinka mora imati najmanje 8 karaktera, najvise 14, bar jedno malo slovo, bar jedno veliko slovo, bar jedan broj i bar jedan specijalni karakter");return;}
      if(!this.regexEmail.test(this.email)){alert("Email nije u dobrom formatu");return;}
      this.userService.getPatient(this.username).subscribe((data:Patient)=>{
        if(data){
          alert("Korisnicko ime ili imejl vec postoje");
        }
        else{
          if(this.password!=this.passwordConfirm){
            alert("Lozinke se ne poklapaju");
          }
          else{
            this.userService.checkEmail(this.email).subscribe((data1:Patient)=>{
              if(data1){
                alert("Korisnicko ime ili imejl vec postoje");
              }
              else{
                this.userService.getRequest(this.username).subscribe((data2:Request)=>{
                  if(data2){
                    if(data2.status=="Odbijeno"){
                      alert("Zahtev za registraciju je odbijen");
                    }
                  }
                  else{
                    if(this.picture==undefined){
                      this.picture="default.jpg";   
                    }
                    this.userService.newRequest(this.username,this.password,this.name,this.surname,this.adress,this.telephone,this.email,this.picture).subscribe((data)=>{
                      if(data['message']=='ok'){
                        alert("Zahtev za registraciju uspesno poslat");
                        this.username=undefined;
                        this.password=undefined;
                        this.passwordConfirm=undefined;
                        this.name=undefined;
                        this.surname=undefined;
                        this.adress=undefined;
                        this.telephone=undefined;
                        this.email=undefined;
                        this.picture=undefined;
                    }  
                    else{
                     alert("Greska pri slanju zahteva za registraciju");
                    }
                    })
                  }
              })
              }
            })
          } 
        }
      })
    }
  }

}
