import express from 'express';
import { PatientController } from '../controllers/patient.controller';
const patientRouter = express.Router();

patientRouter.route('/login').post(
    (req, res) => new PatientController().login(req, res)
)

patientRouter.route('/getPatient').post(
    (req, res) => new PatientController().getPatient(req, res)
)

patientRouter.route('/checkEmail').post(
    (req, res) => new PatientController().checkEmail(req, res)
)

patientRouter.route('/newRequest').post(
    (req, res) => new PatientController().newRequest(req, res)
)

patientRouter.route('/updatePassword').post(
    (req, res) => new PatientController().updatePassword(req, res)
)

patientRouter.route('/updateInfo').post(
    (req, res) => new PatientController().updateInfo(req, res)
)

patientRouter.route('/getMessages').post(
    (req, res) => new PatientController().getMessages(req, res)

)

patientRouter.route('/newMessage').post(
    (req, res) => new PatientController().newMessage(req, res)

)

patientRouter.route('/getPatients').get(
    (req, res) => new PatientController().getPatients(req, res)
)

patientRouter.route('/deletePatient').post(
    (req, res) => new PatientController().deletePatient(req, res)
)

patientRouter.route('/getRequests').get(
    (req, res) => new PatientController().getRequests(req, res)
)

patientRouter.route('/acceptRequest').post(
    (req, res) => new PatientController().acceptRequest(req, res)
)

patientRouter.route('/denyRequest').post(
    (req, res) => new PatientController().denyRequest(req, res)
)

patientRouter.route('/newUser').post(
    (req, res) => new PatientController().newUser(req, res)
)

patientRouter.route('/deleteMessage').post(
    (req, res) => new PatientController().deleteMessage(req, res)
)

patientRouter.route('/readMessage').post(
    (req, res) => new PatientController().readMessage(req, res)
)

patientRouter.route('/getRequest').post(
    (req, res) => new PatientController().getRequest(req, res)
)

export default patientRouter;