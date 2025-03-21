import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let ExamRequest = new Schema({
    lekar: {
        type: String
    },
    zahtev: {
        type: String
    },

})

export default mongoose.model('ExamRequest', ExamRequest, 'preglediZahtevi');