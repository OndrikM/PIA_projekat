import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Doctor = new Schema({
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
    brLicence: {
        type: Number
    },
    specijalizacija: {
        type: String
    },
    ogranak: {
        type: String
    },
    pregledi:{
        type: Array
    },
    slika:{
        type: String
    }
})

export default mongoose.model('Doctor', Doctor, 'lekari');