import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {Router} from 'aurelia-router';
import {Session} from 'services/session';
import * as log from 'toastr';

@inject(AuthService, Router, Session)
export class Login {

    constructor(authService, router, session) {
        this.authService   = authService;
        this.authenticated = false;   
        this.router = router;
        this.session = session;
    };

    activate(params){
        if(params.c == 1){
            this.emailConfirmed = true;
            this.userName = params.userName;
            log.success("Thank you for confirming your email!");
        }
        if(this.authService.isAuthenticated()){
            location.href='/#';
        }
    }

    heading = 'Login';
 
    userName = '';
    password = '';    
    loginError = '';  
    emailConfirmed = false; 

    forgotPassword(){
        this.router.navigate("forgotPassword");
    }
    signup(){
        log.success('signup');
        this.router.navigate("signup");
    } 
    
    // for 3rd pary auth
    //authenticate(name) {
    //    return this.authService.authenticate(name)
    //    .then(response => {
    //        console.log("auth response " + response);
    //    });
    //}

    // use authService.login(credentialsObject) to login to your auth server   
    login() {

        // login the user and set the token
        return this.authService.login({
            login: this.userName,
            password: this.password
        })
        .then(response => {          
            log.success('Welcome ' + this.userName + "!");
            this.authenticated = this.authService.isAuthenticated();
            
            this.currentUser = this.session.getCurrentUser(response);
        })
        .catch(response => {
          
            if(response = 'Error: Expecting a token named "id_token" but instead got: {"authenticated":false}'){
                this.loginError = "Your username or password was incorrect.";
                return;
            }
            if(response = 'Error: Expecting a token named "id_token" but instead got: {"authenticated":false, "email_verified":false}'){
                this.loginError = "Please verify your email before logging in! (Check your email address @ ";
                return;
            }
           
        });
    };
}