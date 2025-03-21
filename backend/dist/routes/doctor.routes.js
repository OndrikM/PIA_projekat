"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctor_controller_1 = require("../controllers/doctor.controller");
const doctorRouter = express_1.default.Router();
doctorRouter.route('/login').post((req, res) => new doctor_controller_1.DoctorController().login(req, res));
doctorRouter.route('/getDoctors').get((req, res) => new doctor_controller_1.DoctorController().getDoctors(req, res));
doctorRouter.route('/getDoctor').post((req, res) => new doctor_controller_1.DoctorController().getDoctor(req, res));
doctorRouter.route('/updatePassword').post((req, res) => new doctor_controller_1.DoctorController().updatePassword(req, res));
doctorRouter.route('/checkEmail').post((req, res) => new doctor_controller_1.DoctorController().checkEmail(req, res));
doctorRouter.route('/updateInfo').post((req, res) => new doctor_controller_1.DoctorController().updateInfo(req, res));
doctorRouter.route('/newDoctor').post((req, res) => new doctor_controller_1.DoctorController().newDoctor(req, res));
doctorRouter.route('/getSpeciality').post((req, res) => new doctor_controller_1.DoctorController().getSpeciality(req, res));
doctorRouter.route('/updateDoctorsExams').post((req, res) => new doctor_controller_1.DoctorController().updateDoctorsExams(req, res));
doctorRouter.route('/newSpec').post((req, res) => new doctor_controller_1.DoctorController().newSpeciality(req, res));
doctorRouter.route('/getSpecs').get((req, res) => new doctor_controller_1.DoctorController().getSpecs(req, res));
doctorRouter.route('/updateSpec').post((req, res) => new doctor_controller_1.DoctorController().updateSpec(req, res));
doctorRouter.route('/getDoctorsBySpec').post((req, res) => new doctor_controller_1.DoctorController().getDoctorsBySpec(req, res));
doctorRouter.route('/updateDoctorBySpec').post((req, res) => new doctor_controller_1.DoctorController().updateDoctorBySpec(req, res));
doctorRouter.route('/deleteDoctor').post((req, res) => new doctor_controller_1.DoctorController().deleteDoctor(req, res));
exports.default = doctorRouter;
//# sourceMappingURL=doctor.routes.js.map