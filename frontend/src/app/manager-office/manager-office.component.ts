import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Manager from '../models/manager';
import { UserService } from '../services/user.service';
import ExamRequest from '../models/examRequest';
import Doctor from '../models/doctor';
import Speciality from '../models/speciality';
import Patient from '../models/patient';
import Examination from '../models/examination';

@Component({
  selector: 'app-manager-office',
  templateUrl: './manager-office.component.html',
  styleUrls: ['./manager-office.component.css']
})
export class ManagerOfficeComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }
  
  manager: Manager;
  requests:Array<ExamRequest>=new Array<ExamRequest>();
  reqDoctors:Array<Doctor>=new Array<Doctor>();
  specs:Array<Speciality>=new Array<Speciality>();
     
  ngOnInit(): void {
    let logged = localStorage.getItem("logged");
    this.userService.getManager(logged).subscribe((m:Manager) => {
      if(!m){localStorage.clear();this.router.navigate([''])}
      this.manager=m;
      this.userService.getSpecs().subscribe((s:Array<Speciality>)=>{
        this.specs=s;
        this.userService.getExamRequests().subscribe((r:Array<ExamRequest>)=>{
          this.requests=r;
          for(let i=0;i<this.requests.length;i++){
            this.userService.getDoctor(this.requests[i].lekar).subscribe((d:Doctor)=>{
              this.reqDoctors.push(d);
            })
          }
        })
      })
    })
  }
  
  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

  deny(r:ExamRequest){
    this.userService.deleteExamRequest(r.lekar,r.zahtev).subscribe((res:any)=>{
      this.reqDoctors.splice(this.requests.indexOf(r),1);
      this.requests.splice(this.requests.indexOf(r),1);
      this.ngOnInit();
    })
  }
  
  selectedReq:ExamRequest;
  index:number;
  newExamDuration:number;
  newExamPrice:number;
  showNewFields:boolean=false;
   
  accept(r:ExamRequest,i:number){
    this.index=i;
    this.selectedReq=r;
    this.showNewFields=true;
  }

  confirm(){
    if(this.newExamPrice){
      if(this.newExamDuration==null){this.newExamDuration=30}
      let doctorAccepted=this.reqDoctors[this.index];
      let specForUpdate=this.specs.find(x=>x.vrsta==doctorAccepted.specijalizacija);
      specForUpdate.pregledi.push(this.selectedReq.zahtev);
      this.userService.updateSpec(specForUpdate.vrsta,specForUpdate.pregledi).subscribe((res:any)=>{
        this.userService.deleteExamRequest(this.selectedReq.lekar,this.selectedReq.zahtev).subscribe((res:any)=>{
          this.userService.newExam(this.selectedReq.zahtev,this.newExamDuration,this.newExamPrice).subscribe((res:any)=>{
            this.showNewFields=false;
            this.newExamDuration=undefined;
            this.newExamPrice=undefined;
            alert("Pregled uspesno dodat");
            this.ngOnInit();
          })
        })
      })
    }
    else{
      alert("Unesite cenu pregleda")
    }
  }

  newSpec: string;

  createNewSpec(){
    if(this.newSpec){
    this.userService.newSpec(this.newSpec).subscribe((res:any)=>{
      if(res['message']=='ok'){
        this.newSpec=undefined;
        alert("Specijalizacija uspesno dodata")
        this.ngOnInit();
      }else{
        alert("Greska pri dodavanju specijalizacije")
      }
    })
    }else{
      alert("Unesite naziv specijalizacije")
    }
  }

  newExam:Array<string>=new Array<string>();
  duration:Array<number>=new Array<number>();
  price:Array<number>=new Array<number>();

  addExam(s:Speciality,i:number){
    if(this.newExam[i]){
      this.userService.getExamination(this.newExam[i]).subscribe((ex:Examination)=>{
        if(!ex){
          if(this.price[i]==undefined){alert("Morate uneti cenu za ovaj pregled");this.price[i]=undefined;return;}
          if(this.duration[i]==undefined){this.duration[i]=30}
          this.userService.newExam(this.newExam[i],this.duration[i],this.price[i]).subscribe((n:Examination)=>{})
        }
        s.pregledi.push(this.newExam[i]);
          this.userService.updateSpec(s.vrsta,s.pregledi).subscribe((res:any)=>{
              if(res){
                this.newExam[i]=undefined;
                this.duration[i]=undefined;
                this.price[i]=undefined;
                alert("Pregled uspesno dodat")
                this.ngOnInit();
              }
              else{
                alert("Greska pri dodavanju pregleda")
              }
            })
          })
    }
    else{
      alert("Unesite podatke pregleda")
    }
}

  deleteExam(e:string,s:Speciality){
    let index=s.pregledi.indexOf(e);
    if(index>-1){
      s.pregledi.splice(index,1);
        this.userService.updateSpec(s.vrsta,s.pregledi).subscribe((r:any)=>{
          if(r){
            if(this.updateDoctors(s,e)){
              alert("Pregled uspesno obrisan")
                this.ngOnInit();
              }
              else{
                alert("Greska pri brisanju pregleda")
              }
            }
            else{
              alert("Greska pri brisanju pregleda")
            }
      })
    }
  }

  updateDoctors(s:Speciality,e:string):boolean{
    let check=true
    this.userService.getDoctorsBySpec(s.vrsta).subscribe((res:Array<Doctor>)=>{
      for(let j=0;j<res.length;j++){
        let index=res[j].pregledi.indexOf(e);
        res[j].pregledi.splice(index,1);
        this.userService.updateDoctorBySpec(res[j].korIme,res[j].pregledi).subscribe((r:any)=>{
          if(r){
            check=true;
          }
          else{
            check=false;
          }
        })
      }
    })
    return check
  }

  newPromo:string;

  createNewPromo(){
    if(this.newPromo){
      this.userService.getPatients().subscribe((res:Array<Patient>)=>{
        for(let r of res){
          this.userService.newMessage("Promocija",r.korIme,this.newPromo).subscribe((res:any)=>{
          })
        }
      })
      this.newPromo=undefined;
      alert("Promocija kreirana i poslata")
    }
    else{
      alert("Unesite tekst promocije")
    }
}

selectedExam:Examination=new Examination();

selectExam(e:string){
  this.userService.getExamination(e).subscribe((res:Examination)=>{
    this.selectedExam=res;
  })
}

newPrice:number;
newDuration:number;

updateExam(){
  if(this.newPrice || this.newDuration){
    this.userService.updateExam(this.selectedExam.naziv,this.newDuration,this.newPrice).subscribe((res:any)=>{
      if(res){
        this.newPrice=undefined;
        this.newDuration=undefined;
        alert("Pregled uspesno izmenjen")
        this.ngOnInit();
      }else{
        alert("Greska pri izmeni pregleda")
      }
    })
  }
  else{
    alert("Unesite nove podatke")
  }
}

}
