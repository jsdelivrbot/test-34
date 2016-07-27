import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import httpConfig from 'configs/app.http';
import * as log from 'toastr';
import _ from 'underscore';

@inject(HttpClient)
export class UserDataService {

    constructor(http) {
        http.configure(httpConfig);
        this.http = http;          
    }  
    getAllUsers() {       

        return this.http.fetch('/api/user/all')
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });     
    }
    updateUser(user) {

        return this.http.fetch('/api/user', 
              { 
                  method: 'post', 
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body:  JSON.stringify(user)      
              })
             .then(response => response.json())
             .then(data => {
                 data.status === "error" ?  log.error(data.message) : log.success('user saved!');
                 return;
             })
             .catch((ex)=> {
                 console.log('failed', ex);
                 log.error(ex.statusText);
                 return;
             });
    }
}