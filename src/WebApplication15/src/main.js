
import config from './authConfig';

export function configure(aurelia) {
    aurelia.use
      .standardConfiguration()
      .plugin('aurelia-api', config => {
          config
            .registerEndpoint('auth').registerEndpoint('api');
      })
      .plugin('aurelia-authentication', (baseConfig)=>{
          baseConfig.configure(config);
      });
   
    aurelia.use.feature('configs');  
   
    //aurelia.use.plugin('aurelia-modal');
    aurelia.use.plugin('aurelia-validatejs');     
    aurelia.use.plugin('aurelia-dialog');
    aurelia.use.plugin('aurelia-animator-velocity');

    let converterPath = 'resources/converters/';
    aurelia.use.globalResources( 
       'schedule/match-modal',
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