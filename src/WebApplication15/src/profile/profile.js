import {inject} from 'aurelia-framework';
import * as log from 'toastr';

export class Profile {

    heading = 'Profile';
 
    constructor(){
        log.info('hello');
    }

    activate(){
        log.info('hello');
    }
    
}