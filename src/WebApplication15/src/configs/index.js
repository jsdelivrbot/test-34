import * as log from 'toastr';

export function configure(aurelia) {

    // Configure Toastr
    log.options.timeOut = 4000;
    log.options.positionClass = 'toast-bottom-right'; 

   
}