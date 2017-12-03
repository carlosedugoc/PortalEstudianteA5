//Módulos
import {BrowserModule }from '@angular/platform-browser'; 
import {NgModule, APP_INITIALIZER }from '@angular/core'; 
import {HttpModule }from "@angular/http"; 
import {HttpClientModule, HttpClient }from '@angular/common/http'; 
//MODULOS
import {FormsModule }from "@angular/forms"; 
import {AppRoutingModule }from "./app-routing.module"; 
import {TranslateModule, TranslateLoader }from '@ngx-translate/core'; 
import {TranslateHttpLoader }from '@ngx-translate/http-loader'; 
import {OAuthModule }from 'angular-oauth2-oidc'; 
//SERVICIOS
import { GlobalService } from "./services/global.service";
import { AppConfiguration } from "./app.configuration";
//ESPECIALES
import {BASE_URL} from "./app.tokens";
import { APP_CONFIG, AppConfig } from './app.config';
//PIPES
import { CapitalizePipe } from './pipes/capitalize.pipe'
import { FilterMenuPipe } from './pipes/filter-menu.pipe'
import { FilterServicePipe } from './pipes/filter-service.pipe'
import { GetFileNameOfPathPipe } from './pipes/get-file-name-of-path.pipe'
//COMPONENTES
import { AppComponent }from './app.component'; 
import { LoginComponent }from './components/login/login.component'; 
import { DashboardComponent }from './components/students/dashboard/dashboard.component'
import { ServiceSettingsComponent }from './components/administration/service-settings/service-settings.component'
import { UniversitySettingsComponent } from './components/administration/university-settings/university-settings.component'
import { ManageRegulationsComponent }from './components/administration/manage-regulations/manage-regulations.component'
import { MenuComponent } from './components/shared/menu/menu.component'
import { FooterComponent } from './components/shared/footer/footer.component'
import { HeaderComponent } from './components/shared/header/header.component'
import { UserComponent } from './components/shared/user/user.component'
import { BannerIframeComponent } from "./components/students/banner-iframe/banner-iframe.component";
import { StudentInfoComponent } from "./components/students/student-info/student-info.component";
import { ServicesListComponent } from './components/administration/services-list/services-list.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initConfig(config: AppConfiguration){
  return () => config.load() 
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
    GetFileNameOfPathPipe,
    BannerIframeComponent,
    StudentInfoComponent,
    ServicesListComponent
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
  providers: [ 
    GlobalService ,
    AppConfiguration,
    { 
      provide: APP_INITIALIZER, 
      useFactory: initConfig, 
      deps: [AppConfiguration], 
      multi: true 
    }
  
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
