import * as express from 'express';
import Patient from '../models/patient'
import Request from '../models/request'
import Message from '../models/message'

export class PatientController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        Patient.findOne({ 'korIme': username, 'lozinka': password}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getPatient = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        Patient.findOne({ 'korIme': username}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }
    getPatients = (req: express.Request, res: express.Response) => {
        Patient.find({}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    checkEmail = (req: express.Request, res: express.Response) => {
        let email = req.body.email
        Patient.findOne({ 'imejl': email }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })  
    }

    newRequest = (req: express.Request, res: express.Response) => {
        let request = new Request({
            korIme:req.body.username,
            lozinka:req.body.password,
            ime:req.body.name,
            prezime:req.body.surname,
            adresa:req.body.adress,
            kontaktTel:req.body.telephone,
            imejl:req.body.email,
            status:"U obradi",
            slika:req.body.picture
    });

    request.save((err,resp)=>
      {if(err){console.log(err);res.status(400).json({"message":"error"})}
          else res.json({"message":"ok"});
      });
    }

    updatePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        Patient.findOneAndUpdate({ 'korIme': username }, { 'lozinka': password }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    updateInfo = (req: express.Request, res: express.Response) => {
        let newUsername = req.body.newUsername;
        let username = req.body.username;
        let adress = req.body.adress;
        let telephone = req.body.telephone;
        let email = req.body.email;
        let picture=req.body.picture;
    
        Patient.findOneAndUpdate({ 'korIme': username }, { 'korIme': newUsername,'adresa':adress,'kontaktTel':telephone,'imejl':email,'slika':picture }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getMessages = (req: express.Request, res: express.Response) => {
     let username = req.body.username;
        Message.find({ 'vlasnik': username }, (err, message) => {
            if (err) console.log(err);
            else res.json(message)
        })
    }

    newMessage = (req: express.Request, res: express.Response) => {
        let message = new Message({
            naslov:req.body.title,
            vlasnik:req.body.username,
            tekst:req.body.message,
            status:"Neprocitano"
        })
        message.save((err,resp)=>
        {if(err){console.log(err);res.status(400).json({"message":"error"})}
            else res.json({"message":"ok"});
        });

    }

    deletePatient = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        
        Patient.deleteOne({'korIme': username}, (err, ap) => {
            if(err){console.log(err);res.json({"message":"error"})}
            else res.json({"message":"ok"});
        })
    }

    getRequests = (req: express.Request, res: express.Response) => {
        Request.find({}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    acceptRequest = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        Request.deleteOne({'korIme': username}, (err, ap) => {
            if(err){console.log(err);res.json({"message":"error"})}
            else res.json({"message":"ok"});
        })
    }

    denyRequest = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        Request.findOneAndUpdate({ 'korIme': username }, { 'status': "Odbijeno" }, (err, user) => {
            if(err){console.log(err);res.json({"message":"error"})}
            else res.json({"message":"ok"});
        })
    }

    newUser = (req: express.Request, res: express.Response) => {
        let patient = new Patient({
            korIme:req.body.username,
            lozinka:req.body.password,
            ime:req.body.name,
            prezime:req.body.surname,
            adresa:req.body.adress,
            kontaktTel:req.body.telephone,
            imejl:req.body.email,
            slika:req.body.picture
        })

        patient.save((err,resp)=>
        {if(err){console.log(err);res.status(400).json({"message":"error"})}
            else res.json({"message":"ok"});
        });
    }

    deleteMessage = (req: express.Request, res: express.Response) => {
        let vlasnik=req.body.owner;
        let tekst=req.body.text;
        let naslov=req.body.title;

        Message.deleteOne({'vlasnik': vlasnik,'tekst':tekst,'naslov':naslov}, (err, ap) => {
            if(err){console.log(err);res.json({"message":"error"})}
            else res.json({"message":"ok"});
        })
    }

    readMessage = (req: express.Request, res: express.Response) => {
        let vlasnik=req.body.owner;
        let tekst=req.body.text;
        let naslov=req.body.title;

        Message.findOneAndUpdate({ 'vlasnik': vlasnik,'tekst':tekst,'naslov':naslov }, { 'status': "Procitano" }, (err, user) => {
            if(err){console.log(err);res.json({"message":"error"})}
            else res.json({"message":"ok"});
        })
    }

    getRequest=(req: express.Request, res: express.Response) => {
        let username = req.body.username;

        Request.findOne({ 'korIme': username }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

}