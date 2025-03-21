import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Examination = new Schema({
    naziv: {
        type: String
    },
    trajanje: {
        type: Number
    },
    cena: {
        type: Number
    }
})

export default mongoose.model('Examination', Examination, 'pregledi');