import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import httpConfig from 'configs/app.http';
import * as log from 'toastr'; 
import _ from 'underscore';

@inject(HttpClient)
export class CustomerDataService {

    constructor(http) {
        http.configure(httpConfig);
        this.http = http;          
    }

    getAllCustomers(){       

        return this.http.fetch('/api/customer/all')
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });           

       
    }
    getCustomers(){       

        return this.http.fetch('/api/customer')
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });           

       
    }

    get customers() {
        return this.http.fetch('/api/customer')           
            .then(response => response.json())
            .then(response => _.sortBy(response, "Name"))
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });           

    }

    getCustomerById(id){
        return this.http.fetch('/api/customer/' + id)
           .then(response => response.json())
           .catch(function(ex) {
               console.log('failed', ex);
               log.error(ex.statusText);
               return;
           }); 
    }
    addCustomer(customer) {
        return this.http.fetch('/api/customer', 
              { 
                  method: 'post', 
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body:  JSON.stringify(customer)      
              })
             .then(response => response.json())
             .then(data => {
                 data.status === "error" ?  log.error(data.message) : log.success('customer added.');
                 return;
             })
             .catch((ex)=> {
                 console.log('failed', ex);
                 log.error(ex.statusText);
                 return;
             });
           
    }
    editCustomer(id, isActive) {
        this.http.fetch('/api/customer/' + id + '/' + isActive, 
             { 
                 method: 'put', 
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 }   
             }).then(()=>{
                 log.success('customer updated.');
             })
           .catch(function(ex) {
               console.log('failed', ex);
               log.error(ex.statusText);
               return;
           });

      
    }

}