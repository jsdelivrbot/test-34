import {AuthService} from 'aurelia-authentication';
import {inject} from 'aurelia-framework';
import {ManageUserService} from 'services/dataservices/manage-user-service';
import {Router} from 'aurelia-router';
import {Session} from 'services/session';
import * as log from 'toastr';
import $ from 'jquery';
import { EventAggregator } from 'aurelia-event-aggregator';
import {DialogService} from 'aurelia-dialog';
import {GolfMatchDataService} from 'services/dataservices/golfmatch-service';
import {Validation} from 'aurelia-validation';
import _ from 'underscore';
import moment from 'moment';
//import 'aurelia/animator-velocity';
import 'fullcalendar/dist/fullcalendar.css!';
import 'bootstrap';
import skeljs from 'skeljs'; import 'utiljs'; import 'mainSkeljs';

@inject(AuthService, ManageUserService, Router, Session, EventAggregator, DialogService, GolfMatchDataService, Validation)
export class Schedule {

    heading = 'Schedule';    
    showing = true;
    pendingUpdate = false;
    updated = true;
    view = "month";
    createMode = false;
    events = [];
    currentContext = "";
    calendarView = true;
    listView = false;
    eventView = false;

    constructor(auth, manage, router, session, eventAggregator, dialogService, golfMatchDataService, validation) {
        this.auth = auth;
        this.manage = manage;
        this.router = router;   
        this.session = session;
        this.ea = eventAggregator;
        this.dialogService = dialogService;
        this.golfMatchDataService = golfMatchDataService;
        this.today = moment().format("dddd MMM DD");
        this.upcomingScheduledMatchesCount = 0;
        this.selectedView = "all";
        this.currentContext = this;
       
      
        // schedule validation              
        this.scheduleValidation =  validation.on(this)
        .ensure('startDate')
              .isNotEmpty();
    }
    openDialog(viewModel, calEvent){
        this.dialogService.open({viewModel: viewModel, model: calEvent}).then(response => {
            if(!response.wasCancelled) {
                console.log('OK');
                this.rating = response.output;
            } else {
                console.log('Cancel');
            }
            console.log(response.output);
        });
    }

    /* Calendar */   

    // clicking on an Event.
    eventClicked(vm, calEvent, jsEvent, view){
        console.log(calEvent);
        vm.openDialog("schedule/match-modal", model: calEvent);
       // this.dialogService.open({viewModel: "schedule/match-modal", model: this})
        //$( '#add-edit-event-modal' ).modal( 'show' ).then(response => {
        //    if(!response.wasCancelled) {
        //        console.log('OK');
        //        this.rating = response.output;
        //    } else {
        //        console.log('Cancel');
        //    }
        //    console.log(response.output);
        //});
       
        // find the scheduled match that matches this event and show it
        //this.options[0].context.eventView = true;
        //this.dialogService.open({ viewModel: this, model: this.calEvent}).then(response => {
        //    if (!response.wasCancelled) {
        //        console.log('good - ', response.output);
        //    } else {
        //        console.log('bad');
        //    }
        //    console.log(response.output);
        //});
        ////  create new eventView object
        //this.options[0].context.scheduleDataService.getScheduleById(calEvent.id).then((schedule) => {
        //    this.options[0].context.selectedMatch = schedule;
        //});
    }
    closeEvent(){
        this.eventView = false;
        this.calendarView = true;
    }
    // event: clicked the calendar icon
    //showCalendarView(){
    //    this.calendarView = true;
    //    this.listView = false;
    //   // this.clearSessionStorage();

    //    this.getSchedules().then(()=> {
    //        this.configureCalendar();
    //    });

    //}

    // event: clicked the list icon
    //showListView(){
    //    this.listView = true;
    //    this.calendarView = false;  
    //    this.eventView = false;
    //   // this.clearSessionStorage();
    //}

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
        }
        else
        {
            var startDate = date.format("MM/DD/YYYY");       
            this.options[0].context.toggleCreateMode(startDate, time);   
        }
    } 
    
    isPast(date) { 
        let today = moment().format();
        return moment( today ).isAfter( date );
    }

    /* setup the calendar */
    configureCalendar(schedule){
        this.events = [];
        this.events.push({
            title: 'This is a Material Design event!',
            start: '10-19-2016',
            end: '10-19-2016',
            color: '#C2185B',
            guests: 50
        });
      
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
           
            //view: "week",
            //eventLimit: true, 
            //theme: true, // jQuery UI themeing
            //handleWindowResize: true,
            //displayEventTime: true,  
            //prev: 'circle-triangle-w',
            //next: 'circle-triangle-e',
            //prevYear: 'seek-prev',
            //nextYear: 'seek-next',            
            //header: {
            //    left: 'prev',
            //    right: 'month,agendaDay'
            //},
            dayClick: (date, jsEvent, view) => this.dayClick(date, jsEvent, view),
            eventClicked: (vm, calEvent, jsEvent, view) => this.eventClicked(self, vm, calEvent, jsEvent, view)
            //eventMouseover:function(calEvent){
            //    $(this).popover({
            //        title: event.name,
            //        placement: 'right',
            //        trigger: 'manual',
            //        content: 'foo',
            //        container: '#calendar'
            //    }).popover('toggle');
            //}
            
           
        }];
       
    }

    attached(){ 
      
        $("#upcoming-matches-header").velocity('transition.slideDownIn');       
        $("#golf-calendar").velocity('transition.slideDownIn');       

        this.getGolfMatches().then(()=> {
            this.configureCalendar();
            console.log(this.events);
        });   
        
       
    }

    activate(){
        let self = this;
        this.currentUser = this.session.getCurrentUser();      
       
        this.showUndo = false;
       // this.clearSessionStorage();
       
    } 
    getGolfMatches() {
        return this.golfMatchDataService.golfmatches
               .then(golfmatches => this.golfmatches = _.sortBy(golfmatches, "GolfMatchId"));   
    }
}