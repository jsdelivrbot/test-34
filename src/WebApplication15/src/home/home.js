import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {Session} from 'services/session';
import {computedFrom} from "aurelia-framework"; 
import * as log from 'toastr';
import {Router} from 'aurelia-router';

@inject(AuthService, Session, Router)
export class Home {

    constructor(auth, session, router){
        this.auth = auth;      
        this.session = session; 
        this.router = router;
        
        this.currentUser = this.getCurrentUser(); 
    }
    activate(){
         
    }
    getCurrentUser(){  
     
        try {
            
            var token = localStorage.getItem('aurelia_id_token');
            let base64Url = token.split('.')[1];
            let base64    =  base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
            this.currentUser = JSON.parse(decodeURIComponent(escape(window.atob(base64))));
            
            return this.currentUser;

        } catch (error) {
            //log.error('Unauthorized (no token)');
        }  
      
    }
    get isAuthenticated(){       
        return this.auth.isAuthenticated();
    }
}