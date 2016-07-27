import {AuthorizeStep} from 'aurelia-authentication';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

// Using Aurelia's dependency injection, we inject Router
// with the @inject decorator
@inject(Router)
export default class {

  constructor(router) {
      this.router = router;     
  }

configure() {

    var appRouterConfig = function(config) {
        config.title = 'ProdTracker';        
        config.addPipelineStep('authorize', AuthorizeStep);

        // Here, we describe the routes we want along with information about them
        // such as which they are accessible at, which module they use, and whether
        // they should be placed in the navigation bar

        // the "_demo" paths are not used, they are just for reference in case they decide to logon a different way (instead of from AD).
        config.map([
          { route: ['admin'], name: 'admin', moduleId: 'admin/admin', nav: false, title:'Admin', auth: true },
          { route: ['','tracker'], name: 'tracker', moduleId: 'tracker/tracker', nav: 1, title: 'L3', auth: true },
          { route: ['settings'], name: 'settings', moduleId: 'settings/settings', nav: 2, title:'Settings', auth: true },
          { route: 'signup', name: 'signup', moduleId: '_demo/signup', nav: false, title:'Sign up' },
          { route: 'login', name: 'login', moduleId: './login', nav: false, title:'Login' },
          { route: 'logout', name: 'logout', moduleId: './logout', nav: false, title:'Logout'},
          { route: 'confirmationSent', name: 'confirmationSent', moduleId: '_demo/confirmationSent', nav: false, title:'Confirmation'},
          { route: 'resetPassword', name: 'resetPassword', moduleId: '_demo/resetPassword', nav: false, title:'ResetPassword'},
          { route: 'forgotPassword', name: 'forgotPassword', moduleId: '_demo/forgotPassword', nav: false, title:'ForgotPassword'},
          { route: 'profile', name: 'profile', moduleId: 'profile/profile', nav: false, title:'Profile', auth: true}
        ]);
    };

    // The router is configured with what we specify in the appRouterConfig
    this.router.configure(appRouterConfig);
}
}