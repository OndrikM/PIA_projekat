import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Message = new Schema({
    naslov:{
        type:String
    },
    vlasnik: {
        type: String
    },
    tekst: {
        type: String
    },
    status:{
        type:String
    }
})

export default mongoose.model('Message', Message, 'poruke');