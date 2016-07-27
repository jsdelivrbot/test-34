import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import httpConfig from 'configs/app.http';

@inject(HttpClient)
export class ExportDataService {

    constructor(http) {
        http.configure(httpConfig);
        this.http = http;          
    }
    
    getExport(partId, traysToExport){      
        var url = '/api/export/?partId=' + partId + "&traysToExport=" + traysToExport; 
        window.open(url, '_blank', '');
    }
}