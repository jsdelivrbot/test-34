import 'bootstrap';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import AppRouterConfig from 'app.router.config';
import {FetchConfig} from 'aurelia-authentication';
import {Session} from 'services/session';
import {ManageUserService} from 'services/dataservices/manage-user-service';
import * as authConfig from 'authConfig';
import * as log from 'toastr';
import {introJs} from 'intro.js';

@inject(Router, FetchConfig, AppRouterConfig, ManageUserService)
export class App {

    title = "ProdTracker";

    FifteenMins = 60000*15;
    FiveMins = 60000*5;
    TwoMins = 60000*2;
    OneMin = 60000;

   
  
    constructor(router, fetchConfig, appRouterConfig, manage){
     
        this.router = router;
        this.fetchConfig = fetchConfig;
        this.appRouterConfig = appRouterConfig;     
        this.manage = manage;

        this.currentYear = new Date().getFullYear();
    }
    attached(){
        introJs().setOptions({ 'skipLabel': 'prevLabel', 'tooltipPosition': 'right','showBullets': false });
        //introJs().addHints();
    }

    /**
   * 
   * Show help tutorial.
   * @function   
   */    
    showIntroHelp(){
        introJs().start();
    }    
    activate(){

        // run the configuration when the app loads
        this.fetchConfig.configure();
        this.appRouterConfig.configure();             
    }

}