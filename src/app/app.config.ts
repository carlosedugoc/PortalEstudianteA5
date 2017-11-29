import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken("app.config");

export interface IAppConfig {
    urlIlumno: string;
}

export const AppConfig: IAppConfig = {    
    urlIlumno: "https://sispoli-q.qailumno.com/StudentRegistrationSsb/ssb/registration"    
};