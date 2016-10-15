import {AuthService} from 'aurelia-authentication';
import {inject} from 'aurelia-framework';
import {ManageUserService} from 'services/dataservices/manage-user-service';
import {Router} from 'aurelia-router';
import {Session} from 'services/session';
import * as log from 'toastr';
import $ from 'jquery';
import { EventAggregator } from 'aurelia-event-aggregator';
import {DialogService} from 'aurelia-dialog';
import {ScheduleDataService} from 'services/dataservices/schedule-service';
import {Validation} from 'aurelia-validation';
import _ from 'underscore';
import moment from 'moment';
//import 'aurelia/animator-velocity';
//import 'fullcalendar/dist/fullcalendar.css!';
//import 'bootstrap-tooltip';
import skeljs from 'skeljs'; import 'utiljs'; import 'mainSkeljs';

@inject(AuthService, ManageUserService, Router, Session, EventAggregator, DialogService, ScheduleDataService, Validation)
export class Schedule {

    heading = 'Schedule';    
   
    pendingUpdate = false;
    updated = true;
    view = "month";
    createMode = false;
    events = [];
    currentContext = "";
    calendarView = true;
    listView = false;
    eventView = false;

    constructor(auth, manage, router, session, eventAggregator, dialogService, scheduleDataService, validation) {
        this.auth = auth;
        this.manage = manage;
        this.router = router;   
        this.session = session;
        this.ea = eventAggregator;
        this.dialogService = dialogService;
        this.scheduleDataService = scheduleDataService;
        this.today = moment().format("dddd MMM DD");
        this.upcomingScheduledMatchesCount = 0;
        this.selectedView = "all";
        this.currentContext = this;
       
        // schedule validation              
        this.scheduleValidation =  validation.on(this)
        .ensure('startDate')
              .isNotEmpty();
    }


    /* Calendar */

    // clicking on an Event.
    eventClicked(calEvent, jsEvent, view){
        console.log(calEvent);
       
        // find the scheduled match that matches this event and show it
        this.options[0].context.eventView = true;

        //  create new eventView object
        this.options[0].context.scheduleDataService.getScheduleById(calEvent.id).then((schedule) => {
            this.options[0].context.selectedMatch = schedule;
        });
    }
    closeEvent(){
        this.eventView = false;
        this.calendarView = true;
    }
    // event: clicked the calendar icon
    showCalendarView(){
        this.calendarView = true;
        this.listView = false;
       // this.clearSessionStorage();

        this.getSchedules().then(()=> {
            this.configureCalendar();
        });

    }

    // event: clicked the list icon
    showListView(){
        this.listView = true;
        this.calendarView = false;  
        this.eventView = false;
       // this.clearSessionStorage();
    }

    // clicking on an empty Day, show create new match.
    dayClick(date, jsEvent, view){

        console.log(date);       
        console.log(view);    

        var check = date._d.toJSON().slice(0,10);      
   
      
        var time = view.type === "month" ? moment().hour(6).minute(0).format('h:mm A') : date.format('h:mm A'); // default to 6am if month view.
       
        var today = new Date().toJSON().slice(0,10);

        if(check < today)
        {
            // dont create match in the past.
        }else{
            var startDate = date.format("MM/DD/YYYY");       
            this.options[0].context.toggleCreateMode(startDate, time);   
        }
    }

    /* setup the calendar */
    configureCalendar(schedule){
        this.events = [];
        
        // load up events
        if(this.schedules){
            for (var i = 0; i < this.schedules.length; i++) {           
                
                let start =  this.schedules[i].ScheduleDateIso;
                console.log(this.schedules[i].Players);

                let foundPlayer = false;
                for (var j = 0; j < this.schedules[i].Players.length; j++) {
                    if(this.schedules[i].Players[j].DisplayName == this.currentUser.displayName ){
                        foundPlayer = true;
                    }
                }

                if(foundPlayer){
                    this.events.push({  
                        title: this.schedules[i].NumberOfHoles + " holes", 
                        start: start, 
                        allDay : false,
                        color: 'black', 
                        backgroundColor: '#48692A',  
                        textColor: '#fff',
                        id: this.schedules[i].ScheduleId
                    });
                }else{
                    this.events.push({  
                        title: this.schedules[i].NumberOfHoles + " holes",
                        start: start, 
                        allDay : false,
                        color: 'grey', 
                        backgroundColor: '#fff',   
                        textColor: '#48692A',
                        id: this.schedules[i].ScheduleId
                    });
                }
                
            }     
        }
        let self = this;

        // options
        this.options = [{ 
            context: self, // the context for the calendar will be this Schedule class. This is used to toggle events in this viewmodel.
            view: "month",
            eventLimit: true, 
            theme: true, 
            handleWindowResize: true,
            displayEventTime: true,  
            prev: 'circle-triangle-w',
            next: 'circle-triangle-e',
            prevYear: 'seek-prev',
            nextYear: 'seek-next',            
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            dayClick: (date, jsEvent, view) => this.dayClick(date, jsEvent, view),
           
            eventMouseover:function(calEvent){
                $(this).popover({
                    title: event.name,
                    placement: 'right',
                    trigger: 'manual',
                    content: 'foo',
                    container: '#calendar'
                }).popover('toggle');
            }
            
           
        }];
       
    }

    attached(){ 
      
        $("#upcoming-matches-header").velocity('transition.slideDownIn');       
        $("#calendar").velocity('transition.slideDownIn');       

        this.getSchedules().then(()=> {
            this.configureCalendar();
        });   
        
       
    }

    activate(){
        let self = this;
        this.currentUser = this.session.getCurrentUser();      
       
        this.showUndo = false;
       // this.clearSessionStorage();
       
    } 
    getSchedules() {
        return this.scheduleDataService.schedules
               .then(schedules => this.schedules = _.sortBy(schedules, "ScheduleId"));   
    }
}