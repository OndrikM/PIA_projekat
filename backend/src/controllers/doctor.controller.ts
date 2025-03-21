import * as express from 'express';
import Doctor from '../models/doctor'
import Speciality from '../models/speciality'

export class DoctorController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        Doctor.findOne({ 'korIme': username, 'lozinka': password}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getDoctors = (req: express.Request, res: express.Response) => {
        Doctor.find({}, (err, doctors) => {
            if (err) console.log(err);
            else res.json(doctors)
        })
    }

    getDoctor = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        Doctor.findOne({ 'korIme': username }, (err, doctor) => {
            if (err) console.log(err);
            else res.json(doctor)
        })
    }

    checkEmail = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        Doctor.findOne({ 'imejl': email }, (err, doctor) => {
            if (err) console.log(err);
            else res.json(doctor)
        })
    }

    updatePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        Doctor.findOneAndUpdate({ 'korIme': username }, { 'lozinka': password }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    updateInfo = (req: express.Request, res: express.Response) => {
        let newUsername = req.body.newUsername;
        let username = req.body.username;
        let adress = req.body.adress;
        let telephone = req.body.telephone;
        let license = req.body.license;
        let speciality = req.body.speciality;
        let picture = req.body.picture;
    
        Doctor.findOneAndUpdate({ 'korIme': username }, { 'korIme': newUsername,'adresa':adress,'kontaktTel':telephone,'brLicence':license,'specijalizacija':speciality,'slika':picture}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    newDoctor = (req: express.Request, res: express.Response) => {
        let doctor=new Doctor({
        korIme:req.body.username,
        lozinka:req.body.password,
        ime:req.body.name,
        prezime:req.body.surname,
        adresa:req.body.adress,
        kontaktTel:req.body.telephone,
        imejl:req.body.email,
        brLicence:req.body.license,
        specijalizacija:req.body.speciality,
        ogranak:req.body.location,
        slika:req.body.picture
    })

    doctor.save((err,resp)=>
        {if(err){console.log(err);res.status(400).json({"message":"error"})}
            else res.json({"message":"ok"});
        });
    }

    getSpeciality = (req: express.Request, res: express.Response) => {
        let name=req.body.name;

        Speciality.findOne({'vrsta':name},(err,spec)=>{
            if(err) console.log(err);
            else res.json(spec);
        })
    }
    
    updateDoctorsExams = (req: express.Request, res: express.Response) => {
        let username=req.body.username;
        let exams=req.body.exams;

        Doctor.findOneAndUpdate({'korIme':username},{'pregledi':exams},(err,doctor)=>{
            if(err) console.log(err);
            else res.json(doctor);
    })
    }

    newSpeciality = (req: express.Request, res: express.Response) => {
        let arr=new Array<string>();
        let spec=new Speciality({
            vrsta:req.body.name,
            pregledi:arr
        })

        spec.save((err,resp)=>
        {if(err){console.log(err);res.status(400).json({"message":"error"})}
            else res.json({"message":"ok"});
        });
    }

    getSpecs = (req: express.Request, res: express.Response) => {
        Speciality.find({},(err,specs)=>{
            if(err) console.log(err);
            else res.json(specs);
        })
    }

    updateSpec = (req: express.Request, res: express.Response) => {
        let vrsta=req.body.vrsta;
        let pregledi=req.body.pregledi;

        Speciality.findOneAndUpdate({'vrsta':vrsta},{'pregledi':pregledi},(err,spec)=>{
            if(err) console.log(err);
            else res.json(spec);
        })
    }

    updateDoctorBySpec = (req: express.Request, res: express.Response) => {
        let username=req.body.username;
        let exams=req.body.exams;

        Doctor.findOneAndUpdate({'korIme':username},{'pregledi':exams},(err,doctor)=>{
            if(err) console.log(err);
            else res.json(doctor);
        })
    }
    
    getDoctorsBySpec = (req: express.Request, res: express.Response) => {
        let spec=req.body.spec;

        Doctor.find({'specijalizacija':spec},(err,doctors)=>{
            if(err) console.log(err);
            else res.json(doctors);
        })
    }

    deleteDoctor = (req: express.Request, res: express.Response) => {
        let username=req.body.username;

        Doctor.deleteOne({'korIme':username},(err)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }
}