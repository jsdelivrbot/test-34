import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import httpConfig from 'configs/app.http';
import * as log from 'toastr';
import _ from 'underscore';

@inject(HttpClient)
export class PartTypeDataService {

    constructor(http) {
        http.configure(httpConfig);
        this.http = http;          
    }  

    get parttypes() {
        return this.http.fetch('/api/parttype')           
            .then(response => response.json())
            .then(response => _.sortBy(response, "Name"))
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });           

    }
    
    getPartTypeById(id){
        return this.http.fetch('/api/parttype/' + id)
           .then(response => response.json())
           .catch(function(ex) {
               console.log('failed', ex);
               log.error(ex.statusText);
               return;
           }); 
    }
    addPartType(parttype) {
        return this.http.fetch('/api/parttype', 
              { 
                  method: 'post', 
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body:  JSON.stringify(parttype)      
              })
             .then(response => response.json())
             .then(data => {
                 data.status === "error" ?  log.error(data.message) : log.success('parttype added.');
                 return;
             })
             .catch((ex)=> {
                 console.log('failed', ex);
                 log.error(ex.statusText);
                 return;
             });
           

      
    }
    

}