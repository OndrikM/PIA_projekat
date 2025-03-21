import * as express from 'express';
import Appointment from '../models/appointment'
import Report from '../models/report'

export class AppointmentController {

    getAppointments = (req: express.Request, res: express.Response) => {
        Appointment.find({}, (err, ap) => {
            if (err) console.log(err);
            else res.json(ap)
        })
    }

    newAppointment = (req: express.Request, res: express.Response) => {
        let appointment = new Appointment({
            pacijent: req.body.username,
            lekar: req.body.doctor,
            datum: req.body.date,
            vreme: req.body.time,
            tip:req.body.type,
            trajanje:req.body.duration
        });
        appointment.save((err,resp)=>
        {if(err){console.log(err);res.status(400).json({"message":"error"})}
            else res.json({"message":"ok"});
        });
    }

    getPatientsAppointments = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        Appointment.find({pacijent:username}, (err, ap) => {
            if (err) console.log(err);
            else res.json(ap)
        })
    }

    cancelAppointment = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.patient;
        let lekar = req.body.doctor;
        let datum = req.body.date;
        let vreme = req.body.time;
      
        Appointment.deleteOne({pacijent: pacijent, lekar: lekar, datum: datum, vreme: vreme}, (err, ap) => {
            if(err){console.log(err);res.json({"message":"error"})}
            else res.json({"message":"ok"});
        })
    }

    getReport = (req: express.Request, res: express.Response) => {
        let username=req.body.username;

        Report.find({pacijent:username}, (err, ap) => {
            if (err) console.log(err);
            else res.json(ap)
        })
    }

    getDoctorsAppointments = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        Appointment.find({lekar:username}, (err, ap) => {
            if (err) console.log(err);
            else res.json(ap)
        })
    }

    newReport = (req: express.Request, res: express.Response) => {
        let report = new Report({
            pacijent: req.body.username,
            lekar: req.body.doctor,
            datum: req.body.date,
            vreme: req.body.time,
            razlog:req.body.reason,
            dijagnoza:req.body.diagnosis,
            terapija:req.body.therapy,
            kontrola:req.body.control,
            specijalizacija:req.body.speciality
        })

        report.save((err,resp)=>
        {if(err){console.log(err);res.status(400).json({"message":"error"})}
            else res.json({"message":"ok"});
        });
    }
    

    deleteAppDoctors = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        Appointment.deleteMany({'lekar':username}, (err, ap) => {
            if (err) console.log(err);
            else res.json(ap)
        })
    }

    deleteAppPatients = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        Appointment.deleteMany({'pacijent':username}, (err, ap) => {
            if (err) console.log(err);
            else res.json(ap)
        })
    }
    
}
