import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { StartComponent } from './start/start.component';
import { SortDirective } from './sort.directive';
import { HeaderComponent } from './header/header.component';
import { PatientsDoctorsComponent } from './patients-doctors/patients-doctors.component';
import { PatientsFormComponent } from './patients-form/patients-form.component';
import { PatientsChecksComponent } from './patients-checks/patients-checks.component';
import { PatientsNotificationsComponent } from './patients-notifications/patients-notifications.component';
import { DoctorsCardComponent } from './doctors-card/doctors-card.component';
import { DoctorsFormComponent } from './doctors-form/doctors-form.component';
import { DoctorsChecksComponent } from './doctors-checks/doctors-checks.component';
import { DoctorsThingsComponent } from './doctors-things/doctors-things.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { ManagerUsersComponent } from './manager-users/manager-users.component';
import { ManagerDoctorsComponent } from './manager-doctors/manager-doctors.component';
import { ManagerOfficeComponent } from './manager-office/manager-office.component';
import { ManagerProfilComponent } from './manager-profil/manager-profil.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterPatientComponent,
    StartComponent,
    SortDirective,
    HeaderComponent,
    PatientsDoctorsComponent,
    PatientsFormComponent,
    PatientsChecksComponent,
    PatientsNotificationsComponent,
    DoctorsCardComponent,
    DoctorsFormComponent,
    DoctorsChecksComponent,
    DoctorsThingsComponent,
    ManagerLoginComponent,
    ManagerUsersComponent,
    ManagerDoctorsComponent,
    ManagerOfficeComponent,
    ManagerProfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    NgxQRCodeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
