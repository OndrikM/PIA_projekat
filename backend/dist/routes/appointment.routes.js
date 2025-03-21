"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointment_controller_1 = require("../controllers/appointment.controller");
const appointmentRouter = express_1.default.Router();
appointmentRouter.route('/getAppointments').get((req, res) => new appointment_controller_1.AppointmentController().getAppointments(req, res));
appointmentRouter.route('/newAppointment').post((req, res) => new appointment_controller_1.AppointmentController().newAppointment(req, res));
appointmentRouter.route('/getPatientsAppointments').post((req, res) => new appointment_controller_1.AppointmentController().getPatientsAppointments(req, res));
appointmentRouter.route('/cancelAppointment').post((req, res) => new appointment_controller_1.AppointmentController().cancelAppointment(req, res));
appointmentRouter.route('/getReport').post((req, res) => new appointment_controller_1.AppointmentController().getReport(req, res));
appointmentRouter.route('/getDoctorsAppointments').post((req, res) => new appointment_controller_1.AppointmentController().getDoctorsAppointments(req, res));
appointmentRouter.route('/newReport').post((req, res) => new appointment_controller_1.AppointmentController().newReport(req, res));
appointmentRouter.route('/deleteAppDoctors').post((req, res) => new appointment_controller_1.AppointmentController().deleteAppDoctors(req, res));
appointmentRouter.route('/deleteAppPatients').post((req, res) => new appointment_controller_1.AppointmentController().deleteAppPatients(req, res));
exports.default = appointmentRouter;
//# sourceMappingURL=appointment.routes.js.map