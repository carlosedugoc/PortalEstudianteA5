import { Http } from '@angular/http';
import { List } from "linqts";
import { AppConfiguration } from "../../app.configuration";

export class GeneralUtils {
    public configuration: AppConfiguration
    constructor(private http: Http) {
        this.configuration = new AppConfiguration(http)
    }

    private config: any

    //// Método de carga de información por defecto.
    //async load() {
    //this.config = await this.getAllConfiguration();
    //}

    // //// Método que obtiene toda la información del archivo de configuración.
    // private async getAllConfiguration(): Promise<any> {
    //     const response = await this.http.get("../../assets/config.json").toPromise();
    //     return response.json();
    // }

    //// Método que obtiene la url del servicio especificado.
    public getServiceByName(key: string) {
        return this.configuration.getConfig('servicios')[key]
    }

    //// Método que obtiene la url del servicio de banner especificado.
    public getServiceByBannerName(key: string) {
        return this.configuration.getConfig('banner')[key]
    }

    //// Método que obtiene la validación por el nombre.
    public getValidationByName(key: string) {
        return this.configuration.getConfig('validaciones')[key]
    }

    //// Método que obtiene la información de configuración de una universidad según su código.
    public getInfoUniversitiesByCode(code: string) {
        let lstUniversities: List<any> = new List(this.configuration.getConfig('universidades'))
        let result = lstUniversities.Where(n => n.Codigo == code).Select(x => x).ToList()
        return result;
    }

    //// Método que obtiene el clientID segun la universidad
    public getClientId(key: string) {
        return this.configuration.getConfig('clients')[key]
    }

    //// Método que obtiene los parametros enviados por get en la petición
    public getParameterHrefByName(name) {
        let url = location.href
        url = url.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(url);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

