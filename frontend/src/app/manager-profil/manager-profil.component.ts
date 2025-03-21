import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Manager from '../models/manager';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-manager-profil',
  templateUrl: './manager-profil.component.html',
  styleUrls: ['./manager-profil.component.css']
})
export class ManagerProfilComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }
  manager: Manager;
  pictureLocation: string = "http://localhost:4000/public/"

  ngOnInit(): void {
    let logged = localStorage.getItem("logged");
    this.userService.getManager(logged).subscribe((m:Manager) => {
      if(!m){localStorage.clear();this.router.navigate([''])}
      this.manager=m;
      this.pictureLocation = this.pictureLocation + this.manager.slika;
    })
  }

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

  regexPass=new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=^[a-zA-Z])(?!.*(.)\1{1}).{8,14}/)
  regexEmail=new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)

  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  changeManagerPassword(){
   if(this.newPassword!=null ||this.oldPassword!=null || this.confirmPassword!=null){}
     if(this.oldPassword!=this.manager.lozinka){
        alert("Pogrešna lozinka");
     }else if(!this.regexPass.test(this.newPassword)){alert("Lozinka mora imati najmanje 8 karaktera, najvise 14, bar jedno malo slovo, bar jedno veliko slovo, bar jedan broj i bar jedan specijalni karakter");return;}
     if(this.newPassword!=this.confirmPassword){
        alert("Lozinke se ne poklapaju");
  }else{
    this.userService.updateManagerPassword(this.manager.korIme,this.newPassword).subscribe((p: Manager) => {
      localStorage.clear();
      alert("Uspesno ste promenili lozinku")
      this.router.navigate(['login']);
    })
   }
  }
   
  newAdress: string;
  newUsername: string;
  newTelephone: string;
  newEmail: string;
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

  updateManagerInfo(){ 
    if(this.newAdress==undefined && this.newUsername==undefined && this.newTelephone==undefined && this.newEmail==undefined && this.newPicture==undefined){
      alert("Niste uneli nove podatke");
    }
    else{
      this.userService.getManager(this.newUsername).subscribe((r:Manager)=>{
        if(r==null){
          if(this.newEmail!=undefined && !this.regexEmail.test(this.newEmail)){alert("Email nije u dobrom formatu");return;}
          this.userService.checkManagerEmail(this.newEmail).subscribe((e:Manager)=>{
            if(e==null){       
              if(this.oldPassword!=this.manager.lozinka){
                alert("Pogresna lozinka");
              }
              else{    
                this.userService.updateManager(this.manager.korIme,this.newUsername,this.newAdress,this.newTelephone,this.newEmail,this.newPicture).subscribe((p:Manager)=>{
                  if(p){
                    alert("Uspesno ste promenili podatke");
                    this.newUsername=undefined;
                    this.newAdress=undefined;
                    this.newTelephone=undefined;
                    this.newEmail=undefined;
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
        else{
          alert("Nije moguce promeniti podatke, postoji korisnik sa zadatim kredencijalama");
        }
      })
    }
  }

}
