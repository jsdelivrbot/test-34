import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {FetchConfig} from 'aurelia-authentication';
import {Session} from 'services/session';
import * as authConfig from 'auth.config';
import * as log from 'toastr';

@inject(Router, FetchConfig)
export class App {

    constructor(router, fetchConfig){
     
        this.router = router;
        this.fetchConfig = fetchConfig;      

        
    }
    activate(){

        // run the configuration when the app loads
        this.fetchConfig.configure();                 
    }

    configureRouter(config, router) {
        config.title = 'Aurelia Master Template';
        //config.addPipelineStep('authorize', AuthorizeStep);
        config.map([
          { route: ['','profile'], moduleId: 'profile/profile', nav: true, title: 'Profile', auth: true },
          { route: 'login', moduleId: './login', nav: false, title:'Login' },
          { route: 'logout', moduleId: './logout', nav: false, title:'Logout'},
        ]); 

        this.router = router;
 
    }
}