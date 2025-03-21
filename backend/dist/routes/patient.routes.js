"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patient_controller_1 = require("../controllers/patient.controller");
const patientRouter = express_1.default.Router();
patientRouter.route('/login').post((req, res) => new patient_controller_1.PatientController().login(req, res));
patientRouter.route('/getPatient').post((req, res) => new patient_controller_1.PatientController().getPatient(req, res));
patientRouter.route('/checkEmail').post((req, res) => new patient_controller_1.PatientController().checkEmail(req, res));
patientRouter.route('/newRequest').post((req, res) => new patient_controller_1.PatientController().newRequest(req, res));
patientRouter.route('/updatePassword').post((req, res) => new patient_controller_1.PatientController().updatePassword(req, res));
patientRouter.route('/updateInfo').post((req, res) => new patient_controller_1.PatientController().updateInfo(req, res));
patientRouter.route('/getMessages').post((req, res) => new patient_controller_1.PatientController().getMessages(req, res));
patientRouter.route('/newMessage').post((req, res) => new patient_controller_1.PatientController().newMessage(req, res));
patientRouter.route('/getPatients').get((req, res) => new patient_controller_1.PatientController().getPatients(req, res));
patientRouter.route('/deletePatient').post((req, res) => new patient_controller_1.PatientController().deletePatient(req, res));
patientRouter.route('/getRequests').get((req, res) => new patient_controller_1.PatientController().getRequests(req, res));
patientRouter.route('/acceptRequest').post((req, res) => new patient_controller_1.PatientController().acceptRequest(req, res));
patientRouter.route('/denyRequest').post((req, res) => new patient_controller_1.PatientController().denyRequest(req, res));
patientRouter.route('/newUser').post((req, res) => new patient_controller_1.PatientController().newUser(req, res));
patientRouter.route('/deleteMessage').post((req, res) => new patient_controller_1.PatientController().deleteMessage(req, res));
patientRouter.route('/readMessage').post((req, res) => new patient_controller_1.PatientController().readMessage(req, res));
patientRouter.route('/getRequest').post((req, res) => new patient_controller_1.PatientController().getRequest(req, res));
exports.default = patientRouter;
//# sourceMappingURL=patient.routes.js.map