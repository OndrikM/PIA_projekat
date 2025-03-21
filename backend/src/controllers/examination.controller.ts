import * as express from 'express';
import Examination from '../models/examination'
import ExamRequest from '../models/examRequest';

export class ExaminationController {

    getExaminations = (req: express.Request, res: express.Response) => {
        Examination.find({}, (err, ex) => {
            if (err) console.log(err);
            else res.json(ex)
        })
    }

    newExamRequest = (req: express.Request, res: express.Response) => {
      let exam=new ExamRequest({
        lekar:req.body.username,
        zahtev:req.body.request
      })

      exam.save((err,resp)=>
        {if(err){console.log(err);res.status(400).json({"message":"error"})}
            else res.json({"message":"ok"});
        });

    }

    getExamination = (req: express.Request, res: express.Response) => {
        let naziv=req.body.name;

        Examination.findOne({'naziv':naziv}, (err, ex) => {
            if (err) console.log(err);
            else res.json(ex)
        })
    }

    getExamRequests = (req: express.Request, res: express.Response) => {
        ExamRequest.find({}, (err, ex) => {
            if (err) console.log(err);
            else res.json(ex)
        })
    }

    deleteExamRequest = (req: express.Request, res: express.Response) => {
        let lekar=req.body.username;
        let zahtev=req.body.name;

        ExamRequest.deleteOne({'lekar':lekar,'zahtev':zahtev}, (err, ex) => {
            if (err) console.log(err);
            else res.json(ex)
        })
    }

    newExam = (req: express.Request, res: express.Response) => {
        let exam=new Examination({
            naziv:req.body.name,
            trajanje:req.body.duration,
            cena:req.body.price
        })

        exam.save((err,resp)=>
        {if(err){console.log(err);res.status(400).json({"message":"error"})}
            else res.json({"message":"ok"});
        });
    }
    
    deleteExam = (req: express.Request, res: express.Response) => {
        let naziv=req.body.name;

        Examination.deleteOne({'naziv':naziv}, (err, ex) => {
            if (err) console.log(err);
            else res.json(ex)
        })
    }

    updateExam = (req: express.Request, res: express.Response) => {
        let naziv=req.body.name;
        let trajanje=req.body.duration;
        let cena=req.body.price;

        Examination.updateOne({'naziv':naziv},{'trajanje':trajanje,'cena':cena}, (err, ex) => {
            if (err) console.log(err);
            else res.json(ex)
        })
    }
}
