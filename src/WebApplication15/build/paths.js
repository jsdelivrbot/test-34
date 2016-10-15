var path = require('path');

var appRoot = 'src/';
var outputRoot = 'wwwroot/dist/';
var exportSourceRoot = 'wwwroot/';
var exportSrvRoot = 'export/';

module.exports = {
    root: appRoot,
    source: appRoot + '**/**/**/*.js',
    html: appRoot + '**/**/**/*.html',
    scss: ['wwwroot/styles/sass/*.scss',
        'wwwroot/styles/sass/layout/*.scss',
        'wwwroot/styles/sass/libs/*.scss',
        'wwwroot/styles/sass/base/*.scss',
        'wwwroot/styles/sass/components/*.scss', 'wwwroot/styles/sass/font-awesome.min.css'
    ],
    images: 'wwwroot/styles/images/*',
    imagesOutput: outputRoot + 'styles/css/images/',
    fonts: 'wwwroot/styles/fonts/*',
    fontsOutput: outputRoot + 'styles/fonts/',
    css: outputRoot + 'styles/css/',
    output: outputRoot,
    exportSourceRoot: exportSourceRoot,
    exportSrv: exportSrvRoot,
    doc: './doc',
    e2eSpecsSrc: '../test/e2e/src/*.js',
    e2eSpecsDist: '../test/e2e/dist/'
};