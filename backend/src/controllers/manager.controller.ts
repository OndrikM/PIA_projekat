import * as express from 'express';
import Manager from '../models/manager'


export class ManagerController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        Manager.findOne({ 'korIme': username, 'lozinka': password}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    
    getManager = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        Manager.findOne({ 'korIme': username}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    updateManager = (req: express.Request, res: express.Response) => {
        let newUsername = req.body.newUsername;
        let username = req.body.username;
        let adress = req.body.adress;
        let telephone = req.body.telephone;
        let email = req.body.email;
        let picture=req.body.picture;
    
        Manager.findOneAndUpdate({ 'korIme': username }, { 'korIme': newUsername,'adresa':adress,'kontaktTel':telephone,'imejl':email,'slika':picture }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    updateManagerPassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        Manager.findOneAndUpdate({ 'korIme': username }, { 'lozinka': password }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    checkManagerEmail = (req: express.Request, res: express.Response) => {
        let email = req.body.email
        Manager.findOne({ 'imejl': email }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })  
    }
}