import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import $ from 'jquery';

@inject(DialogController)
export class MatchModal {
    constructor(controller){
        this.controller = controller;
    } 
 
    activate(calEvent){
        this.event = calEvent;
        console.log("thanks for the " + calEvent);
    }
    
    cancel(){
        $(".active").remove();
        this.controller.cancel();
        
    }
    ok(event){
        // todo: save any edits here
        this.controller.ok(event);
        $(".active").remove();
    }


}