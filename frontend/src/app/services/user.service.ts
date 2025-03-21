import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Appointment from '../models/appointment';
import Speciality from '../models/speciality';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000"



//Metode za pacijenta-----------------------------------------------------------------------------------------------------------------------------------

loginPatient(username: string, password: string) {
    let data = {
      username: username, password: password
    }
    return this.http.post(`${this.uri}/patient/login`, data)
}

getPatient(username: string) {
  let data = {
    username: username
  }
  return this.http.post(`${this.uri}/patient/getPatient`, data)
}

checkEmail(email:string) {
  let data = {
    email:email
  }
  return this.http.post(`${this.uri}/patient/checkEmail`, data)
}

updatePassword(username: string, password: string) {
  let data = {
    username: username, password: password
  }
  return this.http.post(`${this.uri}/patient/updatePassword`, data)
}

updateInfo(username: string,newUsername:string, adress: string, telephone: string, email: string,picture:string) {
  let data = {
    username: username,newUsername:newUsername,adress: adress, telephone: telephone, email: email,picture:picture
  }
  return this.http.post(`${this.uri}/patient/updateInfo`, data)
}

getPatients(){
  return this.http.get(`${this.uri}/patient/getPatients`)
}

deletePatient(username:string){
  let data={
    username:username
  }
  return this.http.post(`${this.uri}/patient/deletePatient`, data)
}

newPatient(username:string,password:string,name:string,surname:string,adress:string,telephone:string,email:string,picture:string){
  let data={
    username:username,password:password,name:name,surname:surname,adress:adress,telephone:telephone,email:email,picture:picture
  }
  return this.http.post(`${this.uri}/patient/newUser`, data)
}

//Kraj metoda za pacijenta--------------------------------------------------------------------------------------------------------------------------------
//Metode za lekara----------------------------------------------------------------------------------------------------------------------------------------

loginDoctor(username: string, password: string) {
  let data = {
    username: username, password: password
  }
  return this.http.post(`${this.uri}/doctor/login`, data)
}

getDoctors() {
  return this.http.get(`${this.uri}/doctor/getDoctors`)
}

getDoctor(username: string) {
  let data = {
    username: username
  }
  return this.http.post(`${this.uri}/doctor/getDoctor`, data)
}
updateDoctorsPassword(username: string, password: string) {
  let data = {
    username: username, password: password
  }
  return this.http.post(`${this.uri}/doctor/updatePassword`, data)
}

checkDoctorsEmail(email:string) {
  let data = {
    email:email
  }
  return this.http.post(`${this.uri}/doctor/checkEmail`, data)
}

updateDoctorInfo(username: string,newUsername:string, adress: string, telephone: string,license:number,speciality:string,picture:string) {
  let data = {
    username: username,newUsername:newUsername,adress: adress, telephone: telephone,
    license:license,speciality:speciality,picture:picture
  }
  return this.http.post(`${this.uri}/doctor/updateInfo`, data)
}

updateDoctorsExams(username:string,exams:string[]){
  let data={
    username:username,exams:exams
  }
  return this.http.post(`${this.uri}/doctor/updateDoctorsExams`, data)
}

getDoctorsBySpec(spec:string){
  let data={
    spec:spec
  }
  return this.http.post(`${this.uri}/doctor/getDoctorsBySpec`, data)
}

updateDoctorBySpec(username:string,exams:string[]){
  let data={
    username:username,exams:exams
  }
  return this.http.post(`${this.uri}/doctor/updateDoctorBySpec`, data)
}

newDoctor(username:string,password:string,name:string,surname:string,adress:string,telephone:string,email:string,license:number,speciality:string,location:string,picture:string){
  let data={
    username:username,password:password,name:name,surname:surname,adress:adress,telephone:telephone,email:email,license:license,speciality:speciality,location:location,picture:picture
  }
  return this.http.post(`${this.uri}/doctor/newDoctor`, data)
}

deleteDoctor(username:string){
  let data={
    username:username
  }
  return this.http.post(`${this.uri}/doctor/deleteDoctor`, data)
}

//Kraj metoda za lekara-----------------------------------------------------------------------------------------------------------------------------------
//Metode za zahtev pacijenta------------------------------------------------------------------------------------------------------------------------------

newRequest(username: string, password: string, name: string, surname: string, adress: string, telephone: string, email: string,picture:string) {
  let data = {
    username: username, password: password, name: name, surname: surname, adress: adress, telephone: telephone, email: email,picture:picture
  }
  return this.http.post(`${this.uri}/patient/newRequest`, data)
}

getRequests(){
  return this.http.get(`${this.uri}/patient/getRequests`)
}

acceptRequest(username:string){
  return this.http.post(`${this.uri}/patient/acceptRequest`, {username:username})
}

denyRequest(username:string){
  return this.http.post(`${this.uri}/patient/denyRequest`, {username:username})
}

getRequest(username:string){
  return this.http.post(`${this.uri}/patient/getRequest`, {username:username})
}

//Kraj metoda za zahtev pacijenta-------------------------------------------------------------------------------------------------------------------------
//Metode za preglede--------------------------------------------------------------------------------------------------------------------------------------

getExaminations(){
  return this.http.get(`${this.uri}/exam/getExams`)
}

getExamination(name:string){
  let data={
    name:name
  }
  return this.http.post(`${this.uri}/exam/getExamination`, data)
}

newExam(name:string,duration:number,price:number){
  let data={
    name:name,duration:duration,price:price
  }
  return this.http.post(`${this.uri}/exam/newExam`, data)
}

deleteExam(name:string){
  let data={
    name:name
  }
  return this.http.post(`${this.uri}/exam/deleteExam`, data)
}

updateExam(name:string,duration:number,price:number){
  let data={
    name:name,duration:duration,price:price
  }
  return this.http.post(`${this.uri}/exam/updateExam`, data)
}

//Kraj metoda za preglede---------------------------------------------------------------------------------------------------------------------------------
//Metode za termine---------------------------------------------------------------------------------------------------------------------------------------

getAppointments(){
  return this.http.get(`${this.uri}/appointment/getAppointments`)
}

newAppointment(username:string,doctor:string,date:string,time:string,duration:number,type:string){
  let data = {
    username:username,doctor:doctor,date:date,time:time,duration:duration,type:type
  }
  return this.http.post(`${this.uri}/appointment/newAppointment`, data)
}

getPatientsAppointments(username:string){
  let data = {
    username:username
  }
  return this.http.post(`${this.uri}/appointment/getPatientsAppointments`, data)
}

cancelAppointment(app:Appointment){
  let data = {
    patient:app.pacijent,doctor:app.lekar,date:app.datum,time:app.vreme
  }
  return this.http.post(`${this.uri}/appointment/cancelAppointment`, data)
}

getDoctorsAppointments(username:string){
 let data={
    username:username
 }
 return this.http.post(`${this.uri}/appointment/getDoctorsAppointments`, data) 
}

deleteAppDoctors(username:string){
  let data={
    username:username
  }
  return this.http.post(`${this.uri}/appointment/deleteAppDoctors`, data)
}

deleteAppPatients(username:string){
  let data={
    username:username
  }
  return this.http.post(`${this.uri}/appointment/deleteAppPatients`, data)
}

//Kraj metoda za termine----------------------------------------------------------------------------------------------------------------------------------
//Metode za izvestaje-------------------------------------------------------------------------------------------------------------------------------------

getReports(username:string){
  let data = {
    username:username
  }
  return this.http.post(`${this.uri}/appointment/getReport`, data)
}

newReport(username:string,doctor:string,date:string,time:string,diagnosis:string,therapy:string,control:string,speciality:string,coming:string){
 let data={
    username:username,doctor:doctor,date:date,time:time,diagnosis:diagnosis,therapy:therapy,control:control,speciality:speciality,reason:coming
 }

 return this.http.post(`${this.uri}/appointment/newReport`, data)
}

//Kraj metoda za izvestaje--------------------------------------------------------------------------------------------------------------------------------
//Metode za poruke---------------------------------------------------------------------------------------------------------------------------------------

getMessages(username:string){
  let data={
    username:username
  }
  return this.http.post(`${this.uri}/patient/getMessages`,data)
}

newMessage(title:string,username:string,text:string){
  let data={
    title:title,username:username,message:text
  }
  return this.http.post(`${this.uri}/patient/newMessage`, data)
}

deleteMessage(owner:string,title:string,text:string){
  let data={
    owner:owner,title:title,text:text
  }

  return this.http.post(`${this.uri}/patient/deleteMessage`, data)
}

readMessage(owner:string,title:string,text:string){
  let data={
    owner:owner,title:title,text:text
  }

  return this.http.post(`${this.uri}/patient/readMessage`, data)
}

//Kraj metoda za poruke----------------------------------------------------------------------------------------------------------------------------------
//Metode za zahteve za preglede--------------------------------------------------------------------------------------------------------------------------

newExamReq(username:string,request:string){
 let data={
    username:username,request:request
 }
  return this.http.post(`${this.uri}/exam/newExamReq`, data)
}

getExamRequests(){
  return this.http.get(`${this.uri}/exam/getExamRequests`)
}

deleteExamRequest(username:string,name:string){
  let data={
    username:username,name:name
  }
  return this.http.post(`${this.uri}/exam/deleteExamRequest`, data)
}

//Kraj metoda za zahteve za preglede---------------------------------------------------------------------------------------------------------------------
//Metode za menadzera------------------------------------------------------------------------------------------------------------------------------------

loginManager(username:string,password:string){
  let data={
    username:username,password:password
  }
  return this.http.post(`${this.uri}/manager/loginManager`, data)
}

getManager(username:string){
  let data={
    username:username
  }
  return this.http.post(`${this.uri}/manager/getManager`, data)
}

updateManager(username:string,newUsername:string,adress:string,telephone:string,email:string,picture:string){
  let data={
    username:username,newUsername:newUsername,adress:adress,telephone:telephone,email:email,picture:picture
  }
  return this.http.post(`${this.uri}/manager/updateManager`, data)
}

updateManagerPassword(username:string,password:string){
  let data={
    username:username,password:password
  }
  return this.http.post(`${this.uri}/manager/updateManagerPassword`, data)
}

checkManagerEmail(email:string){
  let data={
    email:email
  }
  return this.http.post(`${this.uri}/manager/checkManagerEmail`, data)
}

//Kraj metoda za menadzera--------------------------------------------------------------------------------------------------------------------------------
//Metode za specijalizacije-------------------------------------------------------------------------------------------------------------------------------

getSpeciality(name:string){
  let data={
    name:name
  }
  return this.http.post(`${this.uri}/doctor/getSpeciality`, data)
}

newSpec(name:string){
  let data={
    name:name
  }
  return this.http.post(`${this.uri}/doctor/newSpec`, data)
}

getSpecs(){
  return this.http.get(`${this.uri}/doctor/getSpecs`)
}

updateSpec(name:string,exams:string[]){
  let data={
    vrsta:name,pregledi:exams
  }
  return this.http.post(`${this.uri}/doctor/updateSpec`, data)
}

//Kraj metoda za specijalizacije--------------------------------------------------------------------------------------------------------------------------


uploadImage(image:FormData){
  return this.http.post(`${this.uri}/upload`,image)
}

}