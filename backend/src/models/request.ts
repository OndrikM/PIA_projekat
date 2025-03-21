import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Request = new Schema({
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
    status: {
        type: String
    },
    slika:{
        type: String
    }
})

export default mongoose.model('Request', Request, 'zahtevi');