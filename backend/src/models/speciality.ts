import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Speciality= new Schema({
    vrsta: {
        type: String
    },
    pregledi: {
        type: Array
    }
})

export default mongoose.model('Speciality', Speciality, 'specijalizacije');