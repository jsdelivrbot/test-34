import {inject} from 'aurelia-framework';
import * as log from 'toastr';

export class Settings {

    heading = 'Settings';
 
    constructor(){
        
    }

    activate(){
        log.info('Settings');
    }
    
}