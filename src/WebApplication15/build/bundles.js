module.exports = {
    "bundles": {
        "dist/app-build": {
            "includes": [
              "[*.js]",
               "*.html!text",
              "*.css!text",
              "jquery",
             "moment",
             "filesaver.js",
            "toastr",
            "numeral",
            "underscore",
             "intro.js"
            ],
           

            "options": {
                "inject": true,
                "minify": true,
                "depCache": true,
                "rev": false
            }
        },
        "dist/aurelia": {
            "includes": [
              "aurelia-framework",
              "aurelia-bootstrapper",
              "aurelia-fetch-client",
              "aurelia-router",
              "aurelia-dialog",
              "aurelia-validation",
              "aurelia-animator-css",
              "aurelia-polyfills",
              "aurelia-templating-binding",
              "aurelia-templating-resources",
              "aurelia-templating-router",
              "aurelia-loader-default",
              "aurelia-history-browser",
              "aurelia-logging-console",             
              "fetch",
              "aurelia-api",
              "aurelia-authentication",
              "bootstrap",
              "bootstrap/css/bootstrap.css!text",
              "jquery"
              
            ],
            "options": {
                "inject": true,
                "minify": true,
                "depCache": true,
                "rev": false
            }
        }
    }
};