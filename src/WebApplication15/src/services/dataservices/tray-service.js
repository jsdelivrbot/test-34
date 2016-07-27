import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Tray} from 'models/tray';  
import 'fetch';
import httpConfig from 'configs/app.http';
import * as log from 'toastr';
import _ from 'underscore';

@inject(HttpClient)
export class TrayDataService {

    constructor(http) {
      
        this.http = http;     
        this.http.configure(httpConfig);       
    }  
    checkIfSerialsExistInAnotherTray(tray){

        return this.http.fetch('/api/tray/serials/exist', { 
            method: 'post', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(tray)      
        })
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
                // log.error(ex.statusText);
                return;
            }); 
    }
    searchTrayBySerialNumber(serialNumberSearch, partId){
        return this.http.fetch('/api/tray/search/serialNumber/' + serialNumberSearch + '/partId/' + partId)
           .then(response => response.json())
           .catch(function(ex) {
               console.log('failed', ex);
               // log.error(ex.statusText);
               return;
           });  
    }
    searchTrayByTrayNumber(trayNumberSearch, partId) {       
      
        return this.http.fetch('/api/tray/search/trayNumber/' + trayNumberSearch + '/partId/' + partId)
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
                //log.error(ex.statusText);
                return;
            });     
    } 
    getTraysByStockId(stockId){
        return this.http.fetch('/api/tray/stock/' + stockId)
           .then(response => response.json())
           .catch(function(ex) {
               console.log('failed', ex);
               // log.error(ex.statusText);
               return;
           });  
    }

    getTrayBySerialNumber(serialNumber, partId){
        return this.http.fetch('/api/tray/serialNumber/' + serialNumber + '/partId/' + partId)
           .then(response => response.json())
           .catch(function(ex) {
               console.log('failed', ex);
               // log.error(ex.statusText);
               return;
           });  
    }
    getTrayByTrayNumber(trayNumber, partId) {       
      
        return this.http.fetch('/api/tray/trayNumber/' + trayNumber + '/partId/' + partId)
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
                 //log.error(ex.statusText);
                return;
            });     
    } 
    getAllTraysToday(partId) {       

        return this.http.fetch('/api/tray/partId/' + partId + '/today')
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });     
    } 
    getAllTraysThisWeek(partId) {       

        return this.http.fetch('/api/tray/partId/' + partId + '/week')
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });     
    }    
    getAllSerialsForTray(trayId) {       

        return this.http.fetch('/api/tray/trayId/' + trayId + '/serials')
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });     
    }
    getAllPartialTrays(partId) {       

        return this.http.fetch('/api/tray/partId/' + partId + '/partials')
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });     
    }
    getAllTrays(partId) {       

        return this.http.fetch('/api/tray/partId/' + partId)
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });     
    } 
    getAllTraysAvailableForStock(partId){
        return this.http.fetch('/api/tray/partId/' + partId + '/stock-ready')
            .then(response => response.json())
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });     
    }

    saveSerialNumberInTray(trayid, trayposition, serialNumber){

        return this.http.fetch('/api/tray/' + trayid +'/' + trayposition + '/' + serialNumber, 
             { 
                 method: 'put', 
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 }      
             })
            .then(response => response.json())
            .catch((ex)=> {
                //console.log('failed', ex);
                //log.error(ex.message);
                return;
            });
    

    }
    addTray(tray) {
        
        return this.http.fetch('/api/tray', 
              { 
                  method: 'post', 
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body:  JSON.stringify(tray)      
              })
             .then(response => response.json())
             
             .catch((ex)=> {
                 console.log('failed', ex);
                 //log.error(ex.message);
                 return;
             });
    }



}