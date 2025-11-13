import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';
import { HelpState } from './store/help.state';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import json from 'highlight.js/lib/languages/json';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ErrorComponent } from './pages/error/error.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './common/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ExternalApiComponent } from './pages/external-api/external-api.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { AuthInterceptorInterceptor } from '../app/auth-interceptor.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { HeaderComponent } from './common/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import { AddPatientComponent } from './dashboard/add-patient/add-patient.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { DatePipe } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import { PatientDetailsComponent } from './dashboard/patient-details/patient-details.component';
import { PatientMapComponent } from './dashboard/patient-details/patient-map/patient-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PracticeSettingsComponent } from './admin/practice-settings/practice-settings.component';
import {AddUserComponent} from './administration/add-user/add-user.component';
import {UserListComponent} from './administration/user-list/user-list.component';
import { AdminDashboardComponent } from './administration/admin-dashboard/admin-dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UserUpdateComponent } from './administration/user-update/user-update.component';
import { MatDialogModule, MatDialogConfig} from '@angular/material/dialog';
import { DelegateSettingsComponent } from './admin/delegate-settings/delegate-settings.component';
import { SetDateComponent } from './common/set-date/set-date.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FeedbackComponent } from './feedback/feedback.component';
import { BatchpdfComponent } from './batchpdf/batchpdf.component';
import { RemoveBtnComponent } from './remove-btn/remove-btn.component';
import{ AlertSettingsComponent} from './admin/alert-settings/alert-settings.component';
import { PatientGraphsComponent } from './dashboard/patient-details/patient-graphs/patient-graphs.component';
import { PatientMedGraphComponent } from './dashboard/patient-details/patient-graphs/patient-med-graph/patient-med-graph.component';
import { PatientBenzosGraphComponent } from './dashboard/patient-details/patient-graphs/patient-benzos-graph/patient-benzos-graph.component';
import { PatientStimsGraphComponent } from './dashboard/patient-details/patient-graphs/patient-stims-graph/patient-stims-graph.component';
import { PatientPrescribersGraphComponent } from './dashboard/patient-details/patient-graphs/patient-prescribers-graph/patient-prescribers-graph.component';
import { PatientPharmaciesGraphComponent } from './dashboard/patient-details/patient-graphs/patient-pharmacies-graph/patient-pharmacies-graph.component'
import { HelpPopupComponent } from './components/help-popup/help-popup.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NavBarComponent,
    FooterComponent,
    HomeContentComponent,
    LoadingComponent,
    ExternalApiComponent,
    ErrorComponent,
    LoginComponent,
    UserDashboardComponent,
    HeaderComponent,
    AddPatientComponent,
    PatientDetailsComponent,
    PatientMapComponent,
    AdminDashboardComponent,
    AddUserComponent,
    UserListComponent,
    UserUpdateComponent,
    PracticeSettingsComponent,
    DelegateSettingsComponent,
    SetDateComponent,
    FeedbackComponent,
    BatchpdfComponent,
    RemoveBtnComponent,
    AlertSettingsComponent,
    PatientGraphsComponent,
    PatientMedGraphComponent,
    PatientBenzosGraphComponent,
    PatientStimsGraphComponent,
    PatientPrescribersGraphComponent,
    PatientPharmaciesGraphComponent,
    HelpPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgxsModule.forRoot([HelpState]),
    FormsModule,
    HighlightModule,
    FontAwesomeModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        ...env.httpInterceptor
        
      },
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    GoogleMapsModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
    {
      provide: Window,
      useValue: window,
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          json: () => import('highlight.js/lib/languages/json'),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
