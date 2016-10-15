import {AuthService} from 'aurelia-authentication';
import {inject} from 'aurelia-framework';
import {ManageUserService} from 'services/dataservices/manage-user-service';
import * as log from 'toastr';
import {Router} from 'aurelia-router';

@inject(AuthService, ManageUserService, Router)
export class ResetPassword {
    
    heading = 'Reset Password'; 
    userId = '';
    email = '';
    password = '';    
    loginError = '';   
    confirmPassword = '';
    code = '';

    constructor(auth, manage, router) {
        this.auth = auth;
        this.manage = manage;
        this.router = router;
    };

    activate(params){
        if(params.userId && params.code && params.email){
            this.userId = params.userId;
            this.code = params.code;
            this.email = params.email;
        }
    }


    resetPassword(){

        var model = {
            email: this.email, 
            password: this.password, 
            confirmPassword: this.confirmPassword, 
            code:  decodeURIComponent(this.code)
        };
        
        return this.manage.resetPassword(model)
            .then(response => {
                log.success(response);
                console.log("Reset password response: " + response);
                this.router.navigate("login");
            })
        .catch(error => {
            this.loginError = error.response;
            console.log(error);
            log.error(error.ErrorMessage);
        });

    }    
}