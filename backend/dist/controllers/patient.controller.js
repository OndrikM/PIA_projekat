"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientController = void 0;
const patient_1 = __importDefault(require("../models/patient"));
const request_1 = __importDefault(require("../models/request"));
const message_1 = __importDefault(require("../models/message"));
class PatientController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            patient_1.default.findOne({ 'korIme': username, 'lozinka': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getPatient = (req, res) => {
            let username = req.body.username;
            patient_1.default.findOne({ 'korIme': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getPatients = (req, res) => {
            patient_1.default.find({}, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.checkEmail = (req, res) => {
            let email = req.body.email;
            patient_1.default.findOne({ 'imejl': email }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.newRequest = (req, res) => {
            let request = new request_1.default({
                korIme: req.body.username,
                lozinka: req.body.password,
                ime: req.body.name,
                prezime: req.body.surname,
                adresa: req.body.adress,
                kontaktTel: req.body.telephone,
                imejl: req.body.email,
                status: "U obradi",
                slika: req.body.picture
            });
            request.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.updatePassword = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            patient_1.default.findOneAndUpdate({ 'korIme': username }, { 'lozinka': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.updateInfo = (req, res) => {
            let newUsername = req.body.newUsername;
            let username = req.body.username;
            let adress = req.body.adress;
            let telephone = req.body.telephone;
            let email = req.body.email;
            let picture = req.body.picture;
            patient_1.default.findOneAndUpdate({ 'korIme': username }, { 'korIme': newUsername, 'adresa': adress, 'kontaktTel': telephone, 'imejl': email, 'slika': picture }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getMessages = (req, res) => {
            let username = req.body.username;
            message_1.default.find({ 'vlasnik': username }, (err, message) => {
                if (err)
                    console.log(err);
                else
                    res.json(message);
            });
        };
        this.newMessage = (req, res) => {
            let message = new message_1.default({
                naslov: req.body.title,
                vlasnik: req.body.username,
                tekst: req.body.message,
                status: "Neprocitano"
            });
            message.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.deletePatient = (req, res) => {
            let username = req.body.username;
            patient_1.default.deleteOne({ 'korIme': username }, (err, ap) => {
                if (err) {
                    console.log(err);
                    res.json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getRequests = (req, res) => {
            request_1.default.find({}, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.acceptRequest = (req, res) => {
            let username = req.body.username;
            request_1.default.deleteOne({ 'korIme': username }, (err, ap) => {
                if (err) {
                    console.log(err);
                    res.json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.denyRequest = (req, res) => {
            let username = req.body.username;
            request_1.default.findOneAndUpdate({ 'korIme': username }, { 'status': "Odbijeno" }, (err, user) => {
                if (err) {
                    console.log(err);
                    res.json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.newUser = (req, res) => {
            let patient = new patient_1.default({
                korIme: req.body.username,
                lozinka: req.body.password,
                ime: req.body.name,
                prezime: req.body.surname,
                adresa: req.body.adress,
                kontaktTel: req.body.telephone,
                imejl: req.body.email,
                slika: req.body.picture
            });
            patient.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.deleteMessage = (req, res) => {
            let vlasnik = req.body.owner;
            let tekst = req.body.text;
            let naslov = req.body.title;
            message_1.default.deleteOne({ 'vlasnik': vlasnik, 'tekst': tekst, 'naslov': naslov }, (err, ap) => {
                if (err) {
                    console.log(err);
                    res.json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.readMessage = (req, res) => {
            let vlasnik = req.body.owner;
            let tekst = req.body.text;
            let naslov = req.body.title;
            message_1.default.findOneAndUpdate({ 'vlasnik': vlasnik, 'tekst': tekst, 'naslov': naslov }, { 'status': "Procitano" }, (err, user) => {
                if (err) {
                    console.log(err);
                    res.json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getRequest = (req, res) => {
            let username = req.body.username;
            request_1.default.findOne({ 'korIme': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
    }
}
exports.PatientController = PatientController;
//# sourceMappingURL=patient.controller.js.map