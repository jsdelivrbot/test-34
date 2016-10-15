import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {Router} from 'aurelia-router';
import * as log from 'toastr';

// Using Aurelia's dependency injection, we inject the AuthService
// with the @inject decorator
@inject(AuthService, Router)
export class Signup {

    heading = 'Sign Up';

    // These view models will be given values
    // from the signup form user input   
    signUpComplete = true;
    // Any signup errors will be reported by
    // giving this view model a value in the
    // catch block within the signup method
    signupError = '';

    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    };
    login(){
        this.router.navigate("login");
    }
    signup() {
       
        if(!this.email || !this.password)
        {
            log.error("Please enter an email address and a password!");
            return;
        }

        this.signUpComplete = false;
       
        return this.auth.signup({
            firstName: this.firstName, 
            lastName: this.lastName, 
            userName: this.userName, 
            email: this.email, 
            password: this.password 
        })
        .then((response) => {          
            this.signUpComplete = true;
            this.router.navigate("login");            
        })
        .catch(response => {      
            this.signUpComplete = true;
            console.log(response);
            this.router.navigate("login");           
        });

    };
}