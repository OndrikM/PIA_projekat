import express from 'express';
import { DoctorController } from '../controllers/doctor.controller';
const doctorRouter = express.Router();

doctorRouter.route('/login').post(
    (req, res) => new DoctorController().login(req, res)
)

doctorRouter.route('/getDoctors').get(
    (req, res) => new DoctorController().getDoctors(req, res)
)

doctorRouter.route('/getDoctor').post(
    (req, res) => new DoctorController().getDoctor(req, res)
)

doctorRouter.route('/updatePassword').post(
    (req, res) => new DoctorController().updatePassword(req, res)
)

doctorRouter.route('/checkEmail').post(
    (req, res) => new DoctorController().checkEmail(req, res)
)

doctorRouter.route('/updateInfo').post(
    (req, res) => new DoctorController().updateInfo(req, res)
)

doctorRouter.route('/newDoctor').post(
    (req, res) => new DoctorController().newDoctor(req, res)
)

doctorRouter.route('/getSpeciality').post(
    (req, res) => new DoctorController().getSpeciality(req, res)
)

doctorRouter.route('/updateDoctorsExams').post(
    (req, res) => new DoctorController().updateDoctorsExams(req, res)
)

doctorRouter.route('/newSpec').post(
    (req, res) => new DoctorController().newSpeciality(req, res)
)

doctorRouter.route('/getSpecs').get(
    (req, res) => new DoctorController().getSpecs(req, res)
)

doctorRouter.route('/updateSpec').post(
    (req, res) => new DoctorController().updateSpec(req, res)
)

doctorRouter.route('/getDoctorsBySpec').post(
    (req, res) => new DoctorController().getDoctorsBySpec(req, res)
)

doctorRouter.route('/updateDoctorBySpec').post(
    (req, res) => new DoctorController().updateDoctorBySpec(req, res)
)

doctorRouter.route('/deleteDoctor').post(
    (req, res) => new DoctorController().deleteDoctor(req, res)
)

export default doctorRouter;