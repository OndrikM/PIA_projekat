"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExaminationController = void 0;
const examination_1 = __importDefault(require("../models/examination"));
const examRequest_1 = __importDefault(require("../models/examRequest"));
class ExaminationController {
    constructor() {
        this.getExaminations = (req, res) => {
            examination_1.default.find({}, (err, ex) => {
                if (err)
                    console.log(err);
                else
                    res.json(ex);
            });
        };
        this.newExamRequest = (req, res) => {
            let exam = new examRequest_1.default({
                lekar: req.body.username,
                zahtev: req.body.request
            });
            exam.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getExamination = (req, res) => {
            let naziv = req.body.name;
            examination_1.default.findOne({ 'naziv': naziv }, (err, ex) => {
                if (err)
                    console.log(err);
                else
                    res.json(ex);
            });
        };
        this.getExamRequests = (req, res) => {
            examRequest_1.default.find({}, (err, ex) => {
                if (err)
                    console.log(err);
                else
                    res.json(ex);
            });
        };
        this.deleteExamRequest = (req, res) => {
            let lekar = req.body.username;
            let zahtev = req.body.name;
            examRequest_1.default.deleteOne({ 'lekar': lekar, 'zahtev': zahtev }, (err, ex) => {
                if (err)
                    console.log(err);
                else
                    res.json(ex);
            });
        };
        this.newExam = (req, res) => {
            let exam = new examination_1.default({
                naziv: req.body.name,
                trajanje: req.body.duration,
                cena: req.body.price
            });
            exam.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.deleteExam = (req, res) => {
            let naziv = req.body.name;
            examination_1.default.deleteOne({ 'naziv': naziv }, (err, ex) => {
                if (err)
                    console.log(err);
                else
                    res.json(ex);
            });
        };
        this.updateExam = (req, res) => {
            let naziv = req.body.name;
            let trajanje = req.body.duration;
            let cena = req.body.price;
            examination_1.default.updateOne({ 'naziv': naziv }, { 'trajanje': trajanje, 'cena': cena }, (err, ex) => {
                if (err)
                    console.log(err);
                else
                    res.json(ex);
            });
        };
    }
}
exports.ExaminationController = ExaminationController;
//# sourceMappingURL=examination.controller.js.map