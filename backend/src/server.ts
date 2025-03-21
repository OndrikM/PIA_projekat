import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import patientRouter from './routes/patient.routes';
import doctorRouter from './routes/doctor.routes';
import examinationRouter from './routes/examination.routes';
import appointmentRouter from './routes/appointment.routes';
import managerRouter from './routes/manager.routes';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer=require('multer')
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./src/public')
  },
  filename:(req,file,cb)=>{
    cb(null,new Date().getTime()+file.originalname)
  }
})

const upload=multer({storage:storage})

app.post('/upload',upload.single('fs'),(req,res)=>{
  console.log(req.file)
  res.json(req.file.filename)
})

const path=require('path')
app.use('/public',express.static('./src/public'))

mongoose.connect("mongodb://127.0.0.1:27017/ordinacijaDB")
const connection=mongoose.connection
connection.once('open',()=>{
  console.log('db connected')
})

const router=express.Router()
router.use('/patient', patientRouter)
router.use('/doctor', doctorRouter)
router.use('/exam', examinationRouter)
router.use('/appointment', appointmentRouter)
router.use('/manager',managerRouter)
app.use('/',router)
 






app.get('/', (req, res) => res.send('Zdravo'));
app.listen(4000, () => console.log(`Radi na portu 4000`));
