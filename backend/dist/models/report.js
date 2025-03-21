"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
    dijagnoza: {
        type: String
    },
    terapija: {
        type: String
    },
    kontrola: {
        type: String
    },
    specijalizacija: {
        type: String
    },
});
exports.default = mongoose_1.default.model('Report', Report, 'izvestaji');
//# sourceMappingURL=report.js.map