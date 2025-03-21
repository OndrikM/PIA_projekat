import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Report = new Schema({
    pacijent: {
        type: String
    },
    lekar: {
        type: String
    },
    datum: {
        type: String
    },
    vreme: {
        type: String
    },
    razlog: {
        type: String
    },
    dijagnoza:{
        type: String
    },
    terapija:{
        type: String
    },
    kontrola:{
        type: String
    },
    specijalizacija:{
        type: String
    },
})

export default mongoose.model('Report', Report, 'izvestaji');