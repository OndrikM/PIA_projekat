import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Appointment = new Schema({
    pacijent: {
        type: String
    },
    lekar: {
        type: String
    },
    tip: {
        type: String
    },
    datum: {
        type: String
    },
    vreme: {
        type: String
    },
    trajanje:{
        type: Number
    }
})

export default mongoose.model('Appointment', Appointment, 'termini');