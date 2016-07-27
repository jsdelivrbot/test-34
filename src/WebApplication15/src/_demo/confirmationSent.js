import {AuthService} from 'aurelia-authentication';
import {inject} from 'aurelia-framework';

@inject(AuthService)
export class ConfirmationSent {

    constructor(auth) {
        this.auth = auth;
    };

    heading = 'Confirmation Sent';

    
}