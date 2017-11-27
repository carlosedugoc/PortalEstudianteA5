//Modulos
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Componentes
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/students/dashboard/dashboard.component";
import { ServiceSettingsComponent } from "./components/administration/service-settings/service-settings.component";

const routes: Routes = [
    { path: '', component: ServiceSettingsComponent },
    { path: 'services', component: ServiceSettingsComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}

