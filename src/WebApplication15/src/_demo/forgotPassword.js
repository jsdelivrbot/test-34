import {AuthService} from 'aurelia-authentication';
import {inject} from 'aurelia-framework';
import {ManageUserService} from 'services/dataservices/manage-user-service';
import * as log from 'toastr';
import {Router} from 'aurelia-router';

@inject(AuthService, ManageUserService, Router)
export class Login {

    constructor(auth, manage, router) {
        this.auth = auth;
        this.manage = manage;
        this.router = router;
    };

    heading = 'Forgot your password?';
 
    email = '';
    password = '';    
    loginError = '';   
   
    forgotPassword(){
        return this.manage.forgotPassword(this.email)
            .then(response => {               
                this.router.navigate("confirmationSent");
            })
        .catch(error => {
            this.loginError = error.response;
            console.log(error);
            log.error(error.ErrorMessage);
        });

    }

    
}