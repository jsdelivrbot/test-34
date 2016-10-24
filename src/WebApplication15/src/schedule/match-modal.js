import {inject, customElement, bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import moment from 'moment';
import $ from 'jquery';


@inject(DialogController)
export class MatchModal {
    
    constructor(controller){
        this.controller = controller;
    } 

    activate(model){
        $("#main").addClass('blur');
        
        this.match = model.match;  
        this.context = model.context;
        this.mode = model.mode;
        
      
        this.start = moment(this.match.start).format('YYYY-MM-DD'); 
    }
    deactivate(){
        // overlay z-index issue preventing dialog from closing properly.
        $(".active").remove();
       // $("body").removeClass("ai-dialog-open");
        $("#main").removeClass('blur');
       
    }
    ok(match){

        let self = this;

        if(this.mode === 'create'){
            let dto = {

                IsMatchCreator: true,
                StartDate: moment(match.start).format("YYYY-MM-DD"),
                Time: match.time, // 4 hours off?
                Comments: match.title,
                NumberOfHoles: match.numberOfHoles, // undefined
                UserName: self.context.currentContext.currentUser.userName
            };
        
            this.context.golfMatchDataService.addGolfMatch(dto)
                .then(()=> {                          
                    $("#golf-calendar").fullCalendar( 'refetchEvents' );                            
                    self.controller.cancel();
                });
        }
        else
        {
            this.controller.cancel();
        }
    }
    cancel(){
        return this.controller.cancel();
    }

    
}