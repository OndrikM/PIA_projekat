import { Component, OnInit } from '@angular/core';
import Doctor from '../models/doctor';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Speciality from '../models/speciality';

@Component({
  selector: 'app-doctors-form',
  templateUrl: './doctors-form.component.html',
  styleUrls: ['./doctors-form.component.css']
})
export class DoctorsFormComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }
  
  doctor: Doctor;
  speciality:Speciality;
  pictureLocation: string = "http://localhost:4000/public/"

     
  ngOnInit(): void {
    let logged = localStorage.getItem("logged");
    if(!logged){if(!this.doctor)this.router.navigate([''])}
    this.userService.getDoctor(logged).subscribe((d: Doctor) => {
      if(!d){localStorage.clear();this.router.navigate([''])}
      this.doctor = d;
      this.pictureLocation = this.pictureLocation + this.doctor.slika;
      this.userService.getSpeciality(this.doctor.specijalizacija).subscribe((s:Speciality)=>{
        this.speciality=s;
        for(let p of this.doctor.pregledi){
          for(let s of this.speciality.pregledi){
            if(p==s){
              this.speciality.pregledi.splice(this.speciality.pregledi.indexOf(s),1)
            }
          }
        }
      })
    })
  }

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

  regexPass=new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=^[a-zA-Z])(?!.*(.)\1{1}).{8,14}/)

  newUsername:string;
  oldPassword:string;
  newPassword:string;
  confirmPassword:string;
  newAdress:string;
  newTelephone:string;
  newLicense:number;
  newSpeciality:string;
  newPicture:string;
  fileToSend:FormData;

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
            this.newPicture=name;
          })
        }
      }
      pic.src=reader.result as string
    }
    reader.readAsDataURL(file)
  }

  updateInfo(){ 
    if(this.newAdress==null && this.newUsername==null && this.newTelephone==null && this.newPicture==null && this.newLicense==null && this.newSpeciality==null){
      alert("Niste uneli nove podatke");
    }
    else{
      this.userService.getDoctor(this.newUsername).subscribe((r:Doctor)=>{
        if(r==null){ 
              if(this.oldPassword!=this.doctor.lozinka){
                alert("Pogresna lozinka");
              }
              else{    
                this.userService.updateDoctorInfo(this.doctor.korIme,this.newUsername,this.newAdress,this.newTelephone,this.newLicense,this.newSpeciality,this.newPicture).subscribe((d:Doctor)=>{
                  if(d){
                    alert("Uspesno ste promenili podatke");
                    this.newUsername=undefined;
                    this.newAdress=undefined;
                    this.newTelephone=undefined;
                    this.newLicense=undefined;
                    this.newSpeciality=undefined;
                    this.newPicture=undefined;
                    this.oldPassword=undefined;
                    this.ngOnInit();
                  }
                  else {
                    alert("Nije moguce promeniti podatke");
                  }
                })
              }
        }
        else{
          alert("Nije moguce promeniti podatke, postoji korisnik sa zadatim kredencijalama");
        }
      })
    }
  }

  changePassword(){
    if(this.newPassword!=null && this.oldPassword!=null && this.confirmPassword!=null){
      if(this.oldPassword!=this.doctor.lozinka){
        alert("Pogrešna lozinka");
      }
      else      
      if(!this.regexPass.test(this.newPassword)){alert("Lozinka mora imati najmanje 8 karaktera, najvise 14, bar jedno malo slovo, bar jedno veliko slovo, bar jedan broj i bar jedan specijalni karakter");return;}
      if(this.newPassword!=this.confirmPassword){
        alert("Lozinke se ne poklapaju");
      }
      else{
        this.userService.updateDoctorsPassword(this.doctor.korIme,this.newPassword).subscribe((D: Doctor) => {
          localStorage.clear();
          alert("Uspesno ste promenili lozinku")
          this.router.navigate(['login']);
        })
      }
      }
    else{
      alert("Sva polja za lozinku moraju biti popunjena");
    }
  }

selectRemove:string;
selectAdd:string;

removeCheck(){
  if(this.selectRemove){
    this.doctor.pregledi.splice(this.doctor.pregledi.indexOf(this.selectRemove),1)
    this.userService.updateDoctorsExams(this.doctor.korIme,this.doctor.pregledi).subscribe((p)=>{
      if(p)
      {alert("Uspesno ste obrisali pregled");this.ngOnInit()}
      else {alert("Nije moguce obrisati pregled")}
    })
  }
}

addCheck(){
  if(this.selectAdd){
    this.doctor.pregledi.push(this.selectAdd)
    this.userService.updateDoctorsExams(this.doctor.korIme,this.doctor.pregledi).subscribe((p)=>{
      if(p)
      {alert("Uspesno ste dodali pregled");this.ngOnInit()}
      else {alert("Nije moguce dodati pregled")}
    })
  }
}

}
