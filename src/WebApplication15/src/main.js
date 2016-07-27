
export function configure(aurelia) {
    aurelia.use
      .standardConfiguration()
      .developmentLogging();
   
    aurelia.use.feature('configs');
 
    aurelia.use.plugin('aurelia-validatejs');     
    aurelia.use.plugin('aurelia-dialog');
    aurelia.use.plugin('aurelia-animator-velocity');

    let converterPath = 'resources/converters/';
    aurelia.use.globalResources( 
       
        converterPath + 'json',
        converterPath + 'upper',
        converterPath + 'lower',
        converterPath + 'date-format',
        converterPath + 'number-format',
        converterPath + 'sort',
        converterPath + 'take',
        converterPath + 'object-keys',
        converterPath + 'filter' ,
        converterPath + 'filelist-to-array',
        converterPath + 'blob-to-url',
        converterPath + 'group-by'
    );    
   
    aurelia.start().then(a => a.setRoot());
}