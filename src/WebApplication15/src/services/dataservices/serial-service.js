import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import httpConfig from 'configs/app.http';
import * as log from 'toastr';
import {Serial} from 'models/serial';  
import _ from 'underscore';

@inject(HttpClient)
export class SerialDataService {

    constructor(http) {
        http.configure(httpConfig);
        this.http = http;          
    }  
   
    getAllSerials() {       

        return this.http.fetch('/api/serial')
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });     
    } 
}