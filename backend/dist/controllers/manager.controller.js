"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerController = void 0;
const manager_1 = __importDefault(require("../models/manager"));
class ManagerController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            manager_1.default.findOne({ 'korIme': username, 'lozinka': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getManager = (req, res) => {
            let username = req.body.username;
            manager_1.default.findOne({ 'korIme': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.updateManager = (req, res) => {
            let newUsername = req.body.newUsername;
            let username = req.body.username;
            let adress = req.body.adress;
            let telephone = req.body.telephone;
            let email = req.body.email;
            let picture = req.body.picture;
            manager_1.default.findOneAndUpdate({ 'korIme': username }, { 'korIme': newUsername, 'adresa': adress, 'kontaktTel': telephone, 'imejl': email, 'slika': picture }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.updateManagerPassword = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            manager_1.default.findOneAndUpdate({ 'korIme': username }, { 'lozinka': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.checkManagerEmail = (req, res) => {
            let email = req.body.email;
            manager_1.default.findOne({ 'imejl': email }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
    }
}
exports.ManagerController = ManagerController;
//# sourceMappingURL=manager.controller.js.map