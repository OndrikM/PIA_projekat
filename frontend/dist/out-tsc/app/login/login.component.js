import { __decorate } from "tslib";
import { Component } from '@angular/core';
export let LoginComponent = class LoginComponent {
    constructor(router, userService) {
        this.router = router;
        this.userService = userService;
        this.username = '';
        this.password = '';
        this.role = '';
        this.message = '';
    }
    ngOnInit() {
    }
    login() {
        if (this.username == "" || this.password == "") {
            this.message = "Niste uneli sve podatke!";
            return;
        }
        this.message = "";
        if (this.role == "pacijent") {
            this.userService.loginPatient(this.username, this.password).subscribe((k) => {
                if (k) {
                    localStorage.setItem("ulogovan", k.korIme);
                    this.router.navigate([""]);
                }
                else {
                    this.message = "Losi podaci!";
                    return;
                }
            });
        }
        else if (this.role == "lekar") {
            this.userService.loginDoctor(this.username, this.password).subscribe((k) => {
                if (k) {
                    localStorage.setItem("ulogovan", k.korIme);
                    this.router.navigate([""]);
                }
                else {
                    this.message = "Losi podaci!";
                    return;
                }
            });
        }
    }
    loginManager() {
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
//# sourceMappingURL=login.component.js.map