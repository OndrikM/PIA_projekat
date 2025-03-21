"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
    trajanje: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Appointment', Appointment, 'termini');
//# sourceMappingURL=appointment.js.map