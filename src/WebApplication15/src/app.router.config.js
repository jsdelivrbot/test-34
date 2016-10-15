import {AuthorizeStep} from 'aurelia-authentication';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

// Using Aurelia's dependency injection, we inject Router
// with the @inject decorator
@inject(Router)
export default class {

  constructor(router) {
      this.router = router;    
      try {
    
     
      var token = localStorage.getItem('aurelia_id_token');
      let base64Url = token.split('.')[1];
      let base64    =  base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
      this.currentUser = JSON.parse(decodeURIComponent(escape(window.atob(base64))));
           
          
      this.currentUser.image = localStorage.getItem("profile-photo");

      // set the profile image
      this.profileImage = 'data:image/jpeg;base64,' +  this.currentUser.image;   

      } catch (e) {
    
      }
  }
  activate(){
    
  }
configure() {
    var self = this;
    var appRouterConfig = function(config) {
        config.title = 'GolfConnector';        
        config.addPipelineStep('authorize', AuthorizeStep);

        // Here, we describe the routes we want along with information about them
        // such as which they are accessible at, which module they use, and whether
        // they should be placed in the navigation bar
        config.map([
        
          { route: ['','home'], name: 'home', moduleId: 'home/home', nav: 1, title: 'Home',  auth: false},
          { route: ['schedule'], name: 'schedule', moduleId: 'schedule/schedule', nav: 2, title:'Schedule',  auth: true },
 
          { route: 'signup', name: 'signup', moduleId: './signup', nav: true, title:'Sign up',  auth: false },
          
          { route: 'login', name: 'login', moduleId: './login', nav: true, title:'Login',  auth: false },
          { route: 'logout', name: 'logout', moduleId: './logout', nav: true, title:'Logout',  auth: true},
          { route: 'confirmationSent', name: 'confirmationSent', moduleId: './confirmationSent', nav: false, title:'Confirmation'},
          { route: 'resetPassword', name: 'resetPassword', moduleId: './resetPassword', nav: false, title:'ResetPassword'},
          { route: 'forgotPassword', name: 'forgotPassword', moduleId: './forgotPassword', nav: false, title:'ForgotPassword'},
          { route: 'profile', name: 'profile', moduleId: 'user/profile', nav: 4, title:'Profile', settings: self.profileImage, auth: true}
        ]);


    };

    // The router is configured with what we specify in the appRouterConfig
    this.router.configure(appRouterConfig);
}
}