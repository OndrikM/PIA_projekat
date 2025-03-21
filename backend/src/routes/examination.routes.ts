import express from 'express';
import { ExaminationController } from '../controllers/examination.controller';
const examinationRouter = express.Router();


examinationRouter.route('/getExams').get(
    (req, res) => new ExaminationController().getExaminations(req, res)
)

examinationRouter.route('/newExamReq').post(
    (req, res) => new ExaminationController().newExamRequest(req, res)
)

examinationRouter.route('/getExamination').post(
    (req, res) => new ExaminationController().getExamination(req, res)
)

examinationRouter.route('/getExamRequests').get(
    (req, res) => new ExaminationController().getExamRequests(req, res)
)

examinationRouter.route('/deleteExamRequest').post(
    (req, res) => new ExaminationController().deleteExamRequest(req, res)
)

examinationRouter.route('/newExam').post(
    (req, res) => new ExaminationController().newExam(req, res)
)

examinationRouter.route('/deleteExam').post(
    (req, res) => new ExaminationController().deleteExam(req, res)
)

examinationRouter.route('/updateExam').post(
    (req, res) => new ExaminationController().updateExam(req, res)
)



export default examinationRouter;