import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {Session} from 'services/session';
import {computedFrom} from "aurelia-framework"; 
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import * as log from 'toastr';

@inject(AuthService, Session, EventAggregator, Router)
export class NavBar {

    constructor(auth, session, eventAggregator, router){
        this.auth = auth;      
        this.session = session; 
        this.ea = eventAggregator;
        this.router = router;

        let subscription = this.ea.subscribe('profileUpdated', response => {           
            this.getCurrentUser();         
        });
    }
    activate(){
        this.currentUser = this.getCurrentUser();    
    }
    attached() {

        this.subscriber = this.ea.subscribe('profileUpdated', response => {           
            this.getCurrentUser();         
        });
    }
    detached() {
        this.subscriber.dispose();
    }
   
    getCurrentUser(){  
     
        try {
            
            var token = localStorage.getItem('aurelia_authentication');
            let base64Url = token.split('.')[1];
            let base64    =  base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
            this.currentUser = JSON.parse(decodeURIComponent(escape(window.atob(base64))));
            
            // set the profile image
            if(localStorage.getItem("profile-photo")){
                this.profileImage =  "data:image/jpeg;base64," + localStorage.getItem("profile-photo");
            }
            
            return this.currentUser;

        } catch (error) {
            log.error('Unauthorized (no token)');
        }  
      
    }
    get isAuthenticated(){       
        return this.auth.isAuthenticated();
    }
}