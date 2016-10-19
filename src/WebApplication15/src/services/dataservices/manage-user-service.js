import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';
import httpConfig from 'configs/app.http';
import * as log from 'toastr';
import {User} from 'models/user';

@inject(HttpClient)
export class ManageUserService { 

    user = null; 

    constructor(http){

        http.configure(httpConfig);
        this.http = http;

    }

    
    updateUserProfileImage(selectFile) {

        return this.http.fetch('/api/user/profile/image', 
              { 
                  method: 'post', 
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body:  JSON.stringify(selectFile)      
              }).then(data => {
                  data.status === "error" ?  log.error(data.message) : log.success('Your profile has been updated!');
                
                
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
             
             .then(data => {
                 data.status === "error" ?  log.error(data.message) : log.success('Your profile has been updated!');
                
                
             })
             .then(() => {
                 this.refresh();
             })
             .catch((ex)=> {
                 console.log('failed', ex);
                 log.error(ex.statusText);
                 return;
             });
    }
    resetPassword(model){

        return this.http.fetch('/api/auth/resetPassword', 
              { 
                  method: 'post', 
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body:  JSON.stringify(model)      
              })
             .then(response => response.json())
             .then(data => {
                 // data.status === "error" ?  log.error(data.message) : log.success();
                 return;
             })
             .catch((ex)=> {
                 console.log('failed', ex);
                 // log.error(ex.statusText);
                 return;
             });
    }

    forgotPassword(email){
        return this.http.fetch('/api/auth/forgotPassword', 
              { 
                  method: 'post', 
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body:  JSON.stringify(email)      
              })
             .then(response => response.json())
             .then(data => {
                 // data.status === "error" ?  log.error(data.message) : log.success();
                 return;
             })
             .catch((ex)=> {
                 console.log('failed', ex);
                 //log.error(ex.statusText);
                 return;
             });
    }


    
}