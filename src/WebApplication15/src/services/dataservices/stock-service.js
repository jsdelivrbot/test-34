import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import httpConfig from 'configs/app.http';
import * as log from 'toastr';
import _ from 'underscore';

@inject(HttpClient)
export class StockDataService {

    constructor(http) {
        http.configure(httpConfig);
        this.http = http;          
    }  

    get stocks() {
        return this.http.fetch('/api/stock')           
            .then(response => response.json())
            .then(response => _.sortBy(response, "StockDate"))
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });           

    }
    getStockByDates(partId, start, end){
        return this.http.fetch('/api/stock/'+ partId +'/' + start + '/' + end)
           .then(response => response.json())
           .catch(function(ex) {
               console.log('failed', ex);
               log.error(ex.statusText);
               return;
           }); 
    }
    getStockById(id){
        return this.http.fetch('/api/stock/' + id)
           .then(response => response.json())
           .catch(function(ex) {
               console.log('failed', ex);
               log.error(ex.statusText);
               return;
           }); 
    }

    updateTraysStock(id, trays){
        return this.http.fetch('/api/stock/' + id, 
             { 
                 method: 'put', 
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 },
                 body:  JSON.stringify(trays)      
             })
            .then(response => response.json())
            .then(data => {              
                return data;
            })
            .catch((ex)=> {
                //console.log('failed', ex);
                //log.error(ex.statusText);               
            });
    }


    addStock(stock) {
        return this.http.fetch('/api/stock', 
              { 
                  method: 'post', 
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body:  JSON.stringify(stock)      
              })
             .then(response => response.json())
             .then(data => {
                 return data;
             })
             .catch((ex)=> {
                 //console.log('failed', ex);
                 //log.error(ex.statusText);               
             });
    }


    clearStock(stockId) {
        return this.http.fetch('/api/stock/clear-stock', 
              { 
                  method: 'post', 
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body:  JSON.stringify(stockId)      
              })
             .then(response => response.json())
             .then(data => {
                 return data;
             })
             .catch((ex)=> {
                 //console.log('failed', ex);
                 //log.error(ex.statusText);               
             });
    }
    clearTray(trayId) {
        return this.http.fetch('/api/stock/clear-tray', 
              { 
                  method: 'post', 
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body:  JSON.stringify(trayId)      
              })
             .then(response => response.json())
             .then(data => {
                 return data;
             })
             .catch((ex)=> {
                 //console.log('failed', ex);
                 //log.error(ex.statusText);               
             });
    }
}