import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Manager from '../models/manager';
import { UserService } from '../services/user.service';
import Doctor from '../models/doctor';

@Component({
  selector: 'app-manager-doctors',
  templateUrl: './manager-doctors.component.html',
  styleUrls: ['./manager-doctors.component.css']
})
export class ManagerDoctorsComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }
  
  manager: Manager;
  doctors:Array<Doctor>=new Array<Doctor>();
     
  ngOnInit(): void {
    let logged = localStorage.getItem("logged");
    this.userService.getManager(logged).subscribe((m:Manager) => {
      if(!m){localStorage.clear();this.router.navigate([''])}
      this.manager=m;
      this.userService.getDoctors().subscribe((d:Array<Doctor>) => {
        this.doctors=d
      })
    })
  }

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

  regexPass=new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=^[a-zA-Z])(?!.*(.)\1{1}).{8,14}/)
  regexEmail=new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
  
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

  newDoctorForm:boolean=false;

  username:string;
  password:string;
  name:string;
  surname:string;
  email:string;
  phone:string;
  adress:string;
  spec:string;
  license:number;
  location:string;

  newDoctor(){
    let flag=true;
    if(this.username==undefined || this.password==undefined || this.name==undefined || this.surname==undefined || this.email==undefined || this.phone==undefined || this.adress==undefined || this.spec==undefined || this.license==undefined || this.location==undefined){
      alert("Sva polja moraju biti popunjena");
      flag=false;
    }
    else{
      for(let d of this.doctors){
        if(d.korIme==this.username || d.imejl==this.email){
          alert("Vec postoji lekar sa ovim kredencijalima");
          flag=false;
        }
      }
      if(flag==true){
        if(!this.regexPass.test(this.password)){alert("Lozinka nije u dobrom formatu");return;}
        if(!this.regexEmail.test(this.email)){alert("Email nije u dobrom formatu");return;}
        if(this.newPicture==undefined){
          this.newPicture="default.png";
          alert("Preporuka je da se postavi slika lekaru");
        }
        this.userService.newDoctor(this.username,this.password,this.name,this.surname,this.adress,this.phone,this.email,this.license,this.spec,this.location,this.newPicture).subscribe((data) => {
          if(data['message']=='ok'){
            alert("Uspesno dodat lekar");
            this.username=null;
            this.password=null;
            this.name=null;
            this.surname=null;
            this.adress=null;
            this.phone=null;
            this.email=null;
            this.license=null;
            this.spec=null;
            this.location=null;
            this.newPicture=null;
            this.ngOnInit();
          }
          else{
            alert("Neuspesno dodavanje lekara");
          }
        })
        this.newDoctorForm=false;
      }
    }
  }
  
  deleteDoctor(d:Doctor){
    this.userService.deleteAppDoctors(d.korIme).subscribe((data)=>{
      this.userService.deleteDoctor(d.korIme).subscribe((data)=>{
        if(data['message']=='ok'){
          alert("Uspesno obrisan lekar");
          this.ngOnInit();
        }
        else{
           alert("Neuspesno brisanje lekara");
        }
      })
    })
  }

  selectedDoctor:Doctor;
  updateForm:boolean=false;

  selectDoctor(d:Doctor){
    this.selectedDoctor=d;
    this.updateForm=true;
  }

  cancelSelectedDoctor(){
    this.updateForm=false;
    this.selectedDoctor=null;
  }

  newUsername:string;
  newEmail:string;
  newAdress:string;
  newTelephone:string;
  newLicense:number;
  newSpeciality:string;

  fileToSend:FormData;
  newPicture:string;

  changeDoctor(){
    let flag=true;
    if(this.newUsername==undefined && this.newEmail==undefined && this.newAdress==undefined && this.newTelephone==undefined && this.newPicture==undefined && this.newLicense==undefined && this.newSpeciality==undefined){
      alert("Niste uneli nijednu izmenu")
      flag=false;
    }
    else{
      for(let d of this.doctors){
        if(this.selectedDoctor!=d && (d.korIme==this.newUsername || d.imejl==this.newEmail)){
          alert("Korisnicko ime ili imejl vec postoji")
          flag=false;
        }
      }
      if(flag==true){
        this.userService.updateDoctorInfo(this.selectedDoctor.korIme,this.newUsername,this.newAdress,this.newTelephone,this.newLicense,this.newSpeciality,this.newPicture).subscribe((d:Doctor)=>{
          if(d){
            this.newUsername=undefined;
            this.newAdress=undefined;
            this.newTelephone=undefined;
            this.newEmail=undefined;
            this.newPicture=undefined;
            this.newLicense=undefined;
            this.newSpeciality=undefined;
            this.selectedDoctor=undefined;
            alert("Uspesno ste promenili podatke");}
          else{
            alert("Nije moguce promeniti podatke");}
        })
      }  
    this.cancelSelectedDoctor();
    this.ngOnInit();
    }
  }
    
    
  
}
