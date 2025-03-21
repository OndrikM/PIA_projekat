import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Patient = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    korIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    adresa: {
        type: String
    },
    kontaktTel: {
        type: String
    },
    imejl: {
        type: String
    },
    slika:{
        type:String
    }
    
})

export default mongoose.model('Patient', Patient, 'pacijenti');