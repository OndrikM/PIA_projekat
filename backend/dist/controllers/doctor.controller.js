"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const doctor_1 = __importDefault(require("../models/doctor"));
const speciality_1 = __importDefault(require("../models/speciality"));
class DoctorController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            doctor_1.default.findOne({ 'korIme': username, 'lozinka': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getDoctors = (req, res) => {
            doctor_1.default.find({}, (err, doctors) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctors);
            });
        };
        this.getDoctor = (req, res) => {
            let username = req.body.username;
            doctor_1.default.findOne({ 'korIme': username }, (err, doctor) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctor);
            });
        };
        this.checkEmail = (req, res) => {
            let email = req.body.email;
            doctor_1.default.findOne({ 'imejl': email }, (err, doctor) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctor);
            });
        };
        this.updatePassword = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            doctor_1.default.findOneAndUpdate({ 'korIme': username }, { 'lozinka': password }, (err, user) => {
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
            let license = req.body.license;
            let speciality = req.body.speciality;
            let picture = req.body.picture;
            doctor_1.default.findOneAndUpdate({ 'korIme': username }, { 'korIme': newUsername, 'adresa': adress, 'kontaktTel': telephone, 'brLicence': license, 'specijalizacija': speciality, 'slika': picture }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.newDoctor = (req, res) => {
            let doctor = new doctor_1.default({
                korIme: req.body.username,
                lozinka: req.body.password,
                ime: req.body.name,
                prezime: req.body.surname,
                adresa: req.body.adress,
                kontaktTel: req.body.telephone,
                imejl: req.body.email,
                brLicence: req.body.license,
                specijalizacija: req.body.speciality,
                ogranak: req.body.location,
                slika: req.body.picture
            });
            doctor.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getSpeciality = (req, res) => {
            let name = req.body.name;
            speciality_1.default.findOne({ 'vrsta': name }, (err, spec) => {
                if (err)
                    console.log(err);
                else
                    res.json(spec);
            });
        };
        this.updateDoctorsExams = (req, res) => {
            let username = req.body.username;
            let exams = req.body.exams;
            doctor_1.default.findOneAndUpdate({ 'korIme': username }, { 'pregledi': exams }, (err, doctor) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctor);
            });
        };
        this.newSpeciality = (req, res) => {
            let arr = new Array();
            let spec = new speciality_1.default({
                vrsta: req.body.name,
                pregledi: arr
            });
            spec.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getSpecs = (req, res) => {
            speciality_1.default.find({}, (err, specs) => {
                if (err)
                    console.log(err);
                else
                    res.json(specs);
            });
        };
        this.updateSpec = (req, res) => {
            let vrsta = req.body.vrsta;
            let pregledi = req.body.pregledi;
            speciality_1.default.findOneAndUpdate({ 'vrsta': vrsta }, { 'pregledi': pregledi }, (err, spec) => {
                if (err)
                    console.log(err);
                else
                    res.json(spec);
            });
        };
        this.updateDoctorBySpec = (req, res) => {
            let username = req.body.username;
            let exams = req.body.exams;
            doctor_1.default.findOneAndUpdate({ 'korIme': username }, { 'pregledi': exams }, (err, doctor) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctor);
            });
        };
        this.getDoctorsBySpec = (req, res) => {
            let spec = req.body.spec;
            doctor_1.default.find({ 'specijalizacija': spec }, (err, doctors) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctors);
            });
        };
        this.deleteDoctor = (req, res) => {
            let username = req.body.username;
            doctor_1.default.deleteOne({ 'korIme': username }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.DoctorController = DoctorController;
//# sourceMappingURL=doctor.controller.js.map