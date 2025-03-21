import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DoctorComponent } from './doctor/doctor.component';
import { ManagerComponent } from './manager/manager.component';
import { PatientComponent } from './patient/patient.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
export let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            LoginComponent,
            DoctorComponent,
            ManagerComponent,
            PatientComponent,
            RegisterPatientComponent,
            RegisterDoctorComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            FormsModule,
            HttpClientModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map