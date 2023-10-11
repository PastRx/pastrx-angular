import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExternalApiComponent } from './pages/external-api/external-api.component';
import { ErrorComponent } from './pages/error/error.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { LoginComponent } from './auth/login/login.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { AddPatientComponent } from './dashboard/add-patient/add-patient.component';
import { UserDetailsComponent } from './dashboard/user-details/user-details.component';
import {AdminDashboardComponent} from './administration/admin-dashboard/admin-dashboard.component';
import {AddUserComponent} from './administration/add-user/add-user.component';
import {UserListComponent} from './administration/user-list/user-list.component';
import {UserUpdateComponent} from './administration/user-update/user-update.component';
import { PracticeSettingsComponent } from './admin/practice-settings/practice-settings.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-update',
    component: UserUpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'external-api',
    component: ExternalApiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'add-patient',
    component: AddPatientComponent,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: 'user-list',
    component: UserListComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent,
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'practice-settings',
    component: PracticeSettingsComponent,
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
