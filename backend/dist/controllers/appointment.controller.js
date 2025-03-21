"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const appointment_1 = __importDefault(require("../models/appointment"));
const report_1 = __importDefault(require("../models/report"));
class AppointmentController {
    constructor() {
        this.getAppointments = (req, res) => {
            appointment_1.default.find({}, (err, ap) => {
                if (err)
                    console.log(err);
                else
                    res.json(ap);
            });
        };
        this.newAppointment = (req, res) => {
            let appointment = new appointment_1.default({
                pacijent: req.body.username,
                lekar: req.body.doctor,
                datum: req.body.date,
                vreme: req.body.time,
                tip: req.body.type,
                trajanje: req.body.duration
            });
            appointment.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getPatientsAppointments = (req, res) => {
            let username = req.body.username;
            appointment_1.default.find({ pacijent: username }, (err, ap) => {
                if (err)
                    console.log(err);
                else
                    res.json(ap);
            });
        };
        this.cancelAppointment = (req, res) => {
            let pacijent = req.body.patient;
            let lekar = req.body.doctor;
            let datum = req.body.date;
            let vreme = req.body.time;
            appointment_1.default.deleteOne({ pacijent: pacijent, lekar: lekar, datum: datum, vreme: vreme }, (err, ap) => {
                if (err) {
                    console.log(err);
                    res.json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getReport = (req, res) => {
            let username = req.body.username;
            report_1.default.find({ pacijent: username }, (err, ap) => {
                if (err)
                    console.log(err);
                else
                    res.json(ap);
            });
        };
        this.getDoctorsAppointments = (req, res) => {
            let username = req.body.username;
            appointment_1.default.find({ lekar: username }, (err, ap) => {
                if (err)
                    console.log(err);
                else
                    res.json(ap);
            });
        };
        this.newReport = (req, res) => {
            let report = new report_1.default({
                pacijent: req.body.username,
                lekar: req.body.doctor,
                datum: req.body.date,
                vreme: req.body.time,
                razlog: req.body.reason,
                dijagnoza: req.body.diagnosis,
                terapija: req.body.therapy,
                kontrola: req.body.control,
                specijalizacija: req.body.speciality
            });
            report.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.deleteAppDoctors = (req, res) => {
            let username = req.body.username;
            appointment_1.default.deleteMany({ 'lekar': username }, (err, ap) => {
                if (err)
                    console.log(err);
                else
                    res.json(ap);
            });
        };
        this.deleteAppPatients = (req, res) => {
            let username = req.body.username;
            appointment_1.default.deleteMany({ 'pacijent': username }, (err, ap) => {
                if (err)
                    console.log(err);
                else
                    res.json(ap);
            });
        };
    }
}
exports.AppointmentController = AppointmentController;
//# sourceMappingURL=appointment.controller.js.map