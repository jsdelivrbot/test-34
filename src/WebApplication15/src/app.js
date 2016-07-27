export class App {
    configureRouter(config, router) {
        config.title = 'Aurelia Template';
        config.map([
          { route: ['','profile'], name: 'profile', moduleId: 'profile/profile', nav: true, title: 'Profile' },

        ]);

        this.router = router;
    }
}