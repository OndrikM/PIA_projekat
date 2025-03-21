import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
export let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.uri = "http://localhost:4000";
    }
    loginPatient(username, password) {
        let data = {
            username: username, password: password
        };
        return this.http.post(`${this.uri}/patient/login`, data);
    }
    loginDoctor(username, password) {
        let data = {
            username: username, password: password
        };
        return this.http.post(`${this.uri}/doctor/login`, data);
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserService);
//# sourceMappingURL=user.service.js.map