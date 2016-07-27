export class App {
    configureRouter(config, router) {
        config.title = 'Aurelia Master Template';
        config.map([
          { route: ['','profile'], moduleId: 'profile/profile', nav: true, title: 'Profile' },

        ]); 

        this.router = router;
 
    }
}