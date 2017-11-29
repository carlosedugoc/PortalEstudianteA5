//Modulos
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Componentes
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/students/dashboard/dashboard.component";
import { ServiceSettingsComponent } from "./components/administration/service-settings/service-settings.component";
import { UniversitySettingsComponent } from "./components/administration/university-settings/university-settings.component";
import { StudentInfoComponent } from './components/students/student-info/student-info.component';
import { BannerIframeComponent } from "./components/students/banner-iframe/banner-iframe.component";
import { ManageRegulationsComponent } from "./components/administration/manage-regulations/manage-regulations.component";

const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'administration', component: ServiceSettingsComponent },
    { path: 'file-loading', component: ManageRegulationsComponent },
    { path: 'univ-management', component: UniversitySettingsComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'student-info', component: StudentInfoComponent },
    { path: 'banner/:id', component: BannerIframeComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}

