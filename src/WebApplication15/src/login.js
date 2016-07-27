import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {Router} from 'aurelia-router';
import {Session} from 'services/session';
import * as log from 'toastr';

@inject(AuthService, Router, Session)
export class Login {

    loginComplete = true;

    constructor(auth, router, session) {
        this.auth = auth;      
        this.router = router;
        this.session = session;
    };

    activate(params){
        if( params.c == 1 ){
            this.emailConfirmed = true;
            this.username = params.username;
            log.success( 'Thank you for confirming your email!' );
        }
        if( this.auth.isAuthenticated() ){
            location.href = '/#';
        }
    }

    heading = 'Login';
 
    username = '';
    password = '';    
    loginError = '';  
    emailConfirmed = false; 

    hideLoginError(){
        this.loginError = false;
    }
    forgotPassword(){
        this.router.navigate( 'forgotPassword' );
    }
    signup(){
        this.router.navigate( 'signup' );
    }
    login() {
        this.loginComplete = false;
        
        // login the user and set the token
        return this.auth.login({
            login: this.username,
            password: this.password
        })
        .then(response => {          
            log.success( 'Welcome ' + this.username + "!" );
            this.loginComplete = true;

            localStorage.setItem( 'profile-photo', response.image );

            var token = localStorage.getItem( 'name-of-project' );
            this.currentUser = this.session.getCurrentUser( response.id_token );

           
        })
        .catch(response => {
            this.loginComplete = true;

            if(response = 'Error: Expecting a token named "id_token" but instead got: {"authenticated":false}'){
                this.loginError = 'Your username or password was incorrect.';
                return;
            }
            if(response = 'Error: Expecting a token named "id_token" but instead got: {"authenticated":false, "email_verified":false}'){
                this.loginError = 'Please verify your email before logging in! (Check your email address @ ';
                return;
            }
           
            
        });
    };
}