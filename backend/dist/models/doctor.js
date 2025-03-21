"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
    pregledi: {
        type: Array
    },
    slika: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Doctor', Doctor, 'lekari');
//# sourceMappingURL=doctor.js.map