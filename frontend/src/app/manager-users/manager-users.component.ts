import { Component, OnInit } from '@angular/core';
import Manager from '../models/manager';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Patient from '../models/patient';
import Request from '../models/request';

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.css']
})
export class ManagerUsersComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }
  
  manager: Manager;
  patients:Array<Patient>=new Array<Patient>();
  requests:Array<Request>=new Array<Request>();
     
  ngOnInit(): void {
    let logged = localStorage.getItem("logged");
    this.userService.getManager(logged).subscribe((m:Manager) => {
      if(!m){localStorage.clear();this.router.navigate([''])}
      this.manager=m;
      this.userService.getPatients().subscribe((p:Array<Patient>)=>{
        this.patients=p;
        this.userService.getRequests().subscribe((r:Array<Request>)=>{
          this.requests=r;
        })
      })
    })
  }

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

  regexPass=new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=^[a-zA-Z])(?!.*(.)\1{1}).{8,14}/)
  regexEmail=new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)

  delete(p:Patient){
    this.userService.deleteAppPatients(p.korIme).subscribe((res)=>{
      this.userService.deletePatient(p.korIme).subscribe((res)=>{
        if(res['message']=='ok'){
          alert("Pacijent uspesno obrisan")
          this.ngOnInit()
        }
        else{
          alert("Greska pri brisanju pacijenta")
        }
      })
    })
  }

  showButton(r:Request){
    if(r.status=='U obradi')return true;
    else return false;
  }

  accept(r:Request){
    this.userService.acceptRequest(r.korIme).subscribe((res)=>{
      if(res['message']=='ok'){
        this.userService.newPatient(r.korIme,r.lozinka,r.ime,r.prezime,r.adresa,r.kontaktTel,r.imejl,r.slika).subscribe((data:any)=>{
         if(data['message']=='ok'){
          alert("Zahtev uspesno prihvacen")
         }else{
          alert("Greska pri prihvatanju zahteva")
         } 
        })
        this.ngOnInit()
      }else{
        alert("Greska pri prihvatanju zahteva")
      }
    })
  }

  deny(r:Request){
    this.userService.denyRequest(r.korIme).subscribe((res)=>{
      if(res['message']=='ok'){
        alert("Zahtev uspesno odbijen")
        this.ngOnInit()
      }else{
        alert("Greska pri odbijanju zahteva")
      }
    })
  }

  selectedPatient:Patient;
  updateForm:boolean=false;

  selectPatient(p:Patient){
    this.selectedPatient=p;
    this.updateForm=true;
  }

  cancelSelectedPatient(){
    this.updateForm=false;
    this.selectedPatient=null;
  }

  newUsername:string;
  newEmail:string;
  newAdress:string;
  newTelephone:string;
  newPassword:string;

  fileToSend:FormData;
  newPicture:string;

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

  changePatient(){
    if(this.newUsername==undefined && this.newEmail==undefined && this.newAdress==undefined && this.newTelephone==undefined && this.newPicture==undefined && this.newPassword==undefined){
      alert("Niste uneli nijednu izmenu")
      return;
    }
    else{
      for(let p of this.patients){
        if(this.selectedPatient!=p && (p.korIme==this.newUsername || p.imejl==this.newEmail)){
          alert("Korisnicko ime ili imejl vec postoji")
          return;
        }
      }
    }  
    if(this.newEmail!=undefined && !this.regexEmail.test(this.newEmail)){alert("Email nije u dobrom formatu");return;}
    if(this.newPassword!=null){
      if(!this.regexPass.test(this.newPassword)){alert("Lozinka nije u dobrom formatu");return;}
      this.userService.updatePassword(this.selectedPatient.korIme,this.newPassword).subscribe((r:string)=>{
      })
    }
    this.userService.updateInfo(this.selectedPatient.korIme,this.newUsername,this.newAdress,this.newTelephone,this.newEmail,this.newPicture).subscribe((p:Patient)=>{
      if(p){alert("Uspesno ste promenili podatke");}
      else {alert("Nije moguce promeniti podatke");}
    })
    this.cancelSelectedPatient();
    this.ngOnInit();

  }


}
