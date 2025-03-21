import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
const routes = [
    { path: '', component: LoginComponent },
    { path: 'registerPatient', component: RegisterPatientComponent },
    { path: 'registerDoctor', component: RegisterDoctorComponent }
];
export let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
//# sourceMappingURL=app-routing.module.js.map