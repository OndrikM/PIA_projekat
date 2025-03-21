import express from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
const appointmentRouter = express.Router();


appointmentRouter.route('/getAppointments').get(
    (req, res) => new AppointmentController().getAppointments(req, res)
)

appointmentRouter.route('/newAppointment').post(
    (req, res) => new AppointmentController().newAppointment(req, res)
)

appointmentRouter.route('/getPatientsAppointments').post(
    (req, res) => new AppointmentController().getPatientsAppointments(req, res)
)

appointmentRouter.route('/cancelAppointment').post(
    (req, res) => new AppointmentController().cancelAppointment(req, res)
)

appointmentRouter.route('/getReport').post(
    (req, res) => new AppointmentController().getReport(req, res)
)

appointmentRouter.route('/getDoctorsAppointments').post(
    (req, res) => new AppointmentController().getDoctorsAppointments(req, res)
)

appointmentRouter.route('/newReport').post(
    (req, res) => new AppointmentController().newReport(req, res)
)

appointmentRouter.route('/deleteAppDoctors').post(
    (req, res) => new AppointmentController().deleteAppDoctors(req, res)
)

appointmentRouter.route('/deleteAppPatients').post(
    (req, res) => new AppointmentController().deleteAppPatients(req, res)
)

export default appointmentRouter;