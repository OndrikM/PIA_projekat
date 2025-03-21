import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { StartComponent } from './start/start.component';
import { PatientsDoctorsComponent } from './patients-doctors/patients-doctors.component';
import { PatientsFormComponent } from './patients-form/patients-form.component';
import { PatientsChecksComponent } from './patients-checks/patients-checks.component';
import { PatientsNotificationsComponent } from './patients-notifications/patients-notifications.component';
import { DoctorsCardComponent } from './doctors-card/doctors-card.component';
import { DoctorsChecksComponent } from './doctors-checks/doctors-checks.component';
import { DoctorsFormComponent } from './doctors-form/doctors-form.component';
import { DoctorsThingsComponent } from './doctors-things/doctors-things.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { ManagerUsersComponent } from './manager-users/manager-users.component';
import { ManagerDoctorsComponent } from './manager-doctors/manager-doctors.component';
import { ManagerOfficeComponent } from './manager-office/manager-office.component';
import { ManagerProfilComponent } from './manager-profil/manager-profil.component';


const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registerPatient', component: RegisterPatientComponent },
  { path: 'patientForm', component:PatientsFormComponent},
  { path: 'patientDoctor', component:PatientsDoctorsComponent},
  { path: 'patientCheck', component:PatientsChecksComponent},
  { path: 'patientNotification', component:PatientsNotificationsComponent},
  { path: 'doctorCard',component:DoctorsCardComponent},
  { path: 'doctorForm', component:DoctorsFormComponent},
  { path: 'doctorCheck', component:DoctorsChecksComponent},
  { path: 'doctorThing', component:DoctorsThingsComponent},
  { path: 'managerLogin', component:ManagerLoginComponent},
  { path: 'managerUsers', component:ManagerUsersComponent},
  { path: 'managerDoctors', component: ManagerDoctorsComponent},
  { path: 'managerOffice', component: ManagerOfficeComponent},
  { path: 'managerProfile', component: ManagerProfilComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
