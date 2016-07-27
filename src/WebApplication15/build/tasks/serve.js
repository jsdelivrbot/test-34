var gulp = require('gulp');
var browserSync = require('browser-sync');
var proxyMiddleware = require('http-proxy-middleware'); // for corporate proxy

// this task utilizes the browsersync plugin
var proxy = proxyMiddleware('**', { target: 'http://localhost:7000' });

gulp.task('serve', function (done) {
   
    browserSync({
        online: false,
        open: false, // Stop the browser from automatically opening
        port: 7000, // Use a specific port (instead of the one auto-detected by Browsersync) 
        server: {
            baseDir: ".",
            middleware: [proxy]
        },
        // switch them all off in one go
        ghostMode: false
    }, done);
});

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:7000
gulp.task('serve-bundle', ['bundle'], function (done) {
    browserSync({
        online: false,
        open: false,
        port: 7000, // Use a specific port (instead of the one auto-detected by Browsersync) 
        server: {
            baseDir: ['.'],
            middleware: [proxy]
        }
    }, done);
});

