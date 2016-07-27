var path = require('path');

var appRoot = 'src/';
var outputRoot = 'wwwroot/dist/';
var exportSourceRoot = 'wwwroot/';
var exportSrvRoot = 'export/';

module.exports = {
    root: appRoot,
    source: appRoot + '**/**/**/*.js',
    html: appRoot + '**/**/**/*.html',
    scss: ['wwwroot/styles/*.scss'],    
    css: outputRoot + 'styles/',
    output: outputRoot,
    exportSourceRoot: exportSourceRoot,
    exportSrv: exportSrvRoot,
    doc: './doc',
    e2eSpecsSrc: '../test/e2e/src/*.js',
    e2eSpecsDist: '../test/e2e/dist/'
};