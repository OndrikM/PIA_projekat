"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const examination_controller_1 = require("../controllers/examination.controller");
const examinationRouter = express_1.default.Router();
examinationRouter.route('/getExams').get((req, res) => new examination_controller_1.ExaminationController().getExaminations(req, res));
examinationRouter.route('/newExamReq').post((req, res) => new examination_controller_1.ExaminationController().newExamRequest(req, res));
examinationRouter.route('/getExamination').post((req, res) => new examination_controller_1.ExaminationController().getExamination(req, res));
examinationRouter.route('/getExamRequests').get((req, res) => new examination_controller_1.ExaminationController().getExamRequests(req, res));
examinationRouter.route('/deleteExamRequest').post((req, res) => new examination_controller_1.ExaminationController().deleteExamRequest(req, res));
examinationRouter.route('/newExam').post((req, res) => new examination_controller_1.ExaminationController().newExam(req, res));
examinationRouter.route('/deleteExam').post((req, res) => new examination_controller_1.ExaminationController().deleteExam(req, res));
examinationRouter.route('/updateExam').post((req, res) => new examination_controller_1.ExaminationController().updateExam(req, res));
exports.default = examinationRouter;
//# sourceMappingURL=examination.routes.js.map