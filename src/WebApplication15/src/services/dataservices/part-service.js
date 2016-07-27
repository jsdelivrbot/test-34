import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import httpConfig from 'configs/app.http';
import * as log from 'toastr';
import _ from 'underscore';

@inject(HttpClient)
export class PartDataService {

    constructor(http) {
        http.configure(httpConfig);
        this.http = http;          
    }  
    
    getAllParts() {       

        return this.http.fetch('/api/part/all')
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });     
    }

    getAllPartsByCustomerAndPartType(customerName, partTypeId){
        return this.http.fetch('/api/part/customer/'+ customerName + '/partTypeId/' + partTypeId)
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
               // log.error(ex.statusText);
                return;
            });
    }


    get parts() {
        return this.http.fetch('/api/part')           
            .then(response => response.json())
            .then(response => _.sortBy(response, "Name"))
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });           

    }

    getPartById(id){
        return this.http.fetch('/api/part/' + id)
           .then(response => response.json())
           .catch(function(ex) {
               console.log('failed', ex);
               log.error(ex.statusText);
               return;
           }); 
    }

    deletePart(id){
        return this.http.fetch('/api/part/' + id, 
             { 
                 method: 'delete', 
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 }
             })
            .then(response => response.json())
            .then(data => {
                data.status === "error" ?  log.error(data.message) : log.success('part deactivated.');
                return;
            })
            .catch((ex)=> {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });
    }
 
    editPart(id, part){
        return this.http.fetch('/api/part/' + id, 
              { 
                  method: 'put', 
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body:  JSON.stringify(part)      
              })
             .then(response => response.json())
             .then(data => {
                 data.status === "error" ?  log.error(data.message) : log.success('part edited.');
                 return;
             })
             .catch((ex)=> {
                 
                 return;
             });
    }
    addPart(part) {
        return this.http.fetch('/api/part', 
              { 
                  method: 'post', 
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body:  JSON.stringify(part)      
              })
             .then(response => response.json())
             .then(data => {
                 data.status === "error" ?  log.error(data.message) : log.success('part added.');
                 return;
             })
             .catch((ex)=> {
                 console.log('failed', ex);
                 log.error(ex.statusText);
                 return;
             });
    }
}