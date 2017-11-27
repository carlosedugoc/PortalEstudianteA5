//Módulos
import {BrowserModule }from '@angular/platform-browser'; 
import {NgModule }from '@angular/core'; 
import {HttpModule }from "@angular/http"; 
import {HttpClientModule, HttpClient }from '@angular/common/http'; 
import {FormsModule }from "@angular/forms"; 
import {AppRoutingModule }from "./app-routing.module"; 
import {TranslateModule, TranslateLoader }from '@ngx-translate/core'; 
import {TranslateHttpLoader }from '@ngx-translate/http-loader'; 
import {OAuthModule }from 'angular-oauth2-oidc'; 
//Servicios
import { GlobalService } from "./services/global.service";
//Pipes
import { CapitalizePipe } from './pipes/capitalize.pipe'
import { FilterMenuPipe } from './pipes/filter-menu.pipe'
import { FilterServicePipe } from './pipes/filter-service.pipe'
import { GetFileNameOfPathPipe } from './pipes/get-file-name-of-path.pipe'
//Componentes
import {AppComponent }from './app.component'; 
import {LoginComponent }from './components/login/login.component'; 
import {DashboardComponent }from './components/students/dashboard/dashboard.component'
import {ServiceSettingsComponent }from './components/administration/service-settings/service-settings.component'
import { UniversitySettingsComponent } from './components/administration/university-settings/university-settings.component'
import { ManageRegulationsComponent }from './components/administration/manage-regulations/manage-regulations.component'
import { MenuComponent } from './components/shared/menu/menu.component'
import { FooterComponent } from './components/shared/footer/footer.component'
import { HeaderComponent } from './components/shared/header/header.component'
import { UserComponent } from './components/shared/user/user.component'

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ServiceSettingsComponent,
    UniversitySettingsComponent,
    ManageRegulationsComponent,
    MenuComponent,
    FooterComponent,
    HeaderComponent,
    UserComponent,
    CapitalizePipe,
    FilterMenuPipe,
    FilterServicePipe,
    GetFileNameOfPathPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  }),
  OAuthModule.forRoot()
  ],
  providers: [ GlobalService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
