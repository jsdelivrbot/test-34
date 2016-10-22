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
//import 'bootstrap';
import skeljs from 'skeljs'; import 'utiljs'; import 'mainSkeljs';
import {fullCalendar} from 'fullcalendar';
//import "bootstrap/css/bootstrap.css!";
import {MatchModal} from './match-modal';

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
    schedule = {};
   

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
   
    attached(){ 
      
        $("#upcoming-matches-header").velocity('slideDownIn');       
        $("#golf-calendar").velocity('slideDownIn');       

        this.getGolfMatches().then(()=> {
            this.configureCalendar();  
            
           
        });   
        
        
    }

    activate(){
        let self = this;
        this.currentUser = this.session.getCurrentUser();      
       
        this.showUndo = false;
        // this.clearSessionStorage();
       
    } 
    /* Calendar */   
    //eventClicked(calEvent, jsEvent, view){
    //    console.log(calEvent);
       
    //    // find the scheduled match that matches this event and show it
    //    this.options[0].context.eventView = true;

    //    //  create new eventView object
    //    this.options[0].context.scheduleDataService.getScheduleById(calEvent.id).then((schedule) => {
    //        this.options[0].context.selectedMatch = schedule;
    //    });
    //}
    eventClick(event){  
        
        console.log(event);
 
        
        // Aurelia dialog
        this.dialogService.open({ viewModel: MatchModal, model: event}).then(response => {

         
            if (!response.wasCancelled) {
                console.log('good - ', response.output);
            } else {
                console.log('bad');
            }
            console.log(response.output);

           


            //if (!response.wasCancelled) {
                
            //    let newPlayer = response.output;
            //    console.log(newPlayer);
            //    //schedule.Players.push({ UserName: newPlayer[0].DisplayName, Handicap: newPlayer[0].Handicap,  UserId: newPlayer[0].UserId, JoinedByThemselves: false});

            //    //return this.scheduleDataService.editSchedule(schedule.ScheduleId, schedule).then(()=>{
            //    //    log.success(newPlayer[0].DisplayName + ' is now in the match!');
            //    //    this.setSelectedView();

            //    //    setTimeout(()=>{
                      
            //    //        $(".small-user").velocity('callout.pulse');
                       
                       
            //    //    },1000);
                    
            //    //}).then(()=>{
            //    //    if(this.eventView){
                       
            //    //        this.scheduleDataService.getScheduleById(schedule.ScheduleId).then((schedule) => {
            //    //            this.selectedMatch = schedule;
            //    //        });
            //    //    }
            //    //});
               
            //}            
        });

      
      
    }

    // clicking on an empty Day, show create new match.
    dayClick(options, date, jsEvent, view){

        console.log(date);       
        console.log(view);    
        options.options[0].context.toggleCreateMode(startDate, time); 
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
 
    /* setup the calendar */
    configureCalendar(schedule){

        // get events for calendar.
        this.events = [];
        this.events.push({
            title: 'This is a Material Design event!',
            start: '10-19-2016',
            end: '10-19-2016',
            color: '#C2185B',
            guests: 50
        });     
        this.events.push({
            title: 'happy birthday!',
            start: '10-19-2016',
            end: '10-19-2016',
            color: '#C2185B',
            guests: 50
        });    

        this.events.push({
            title: 'happy birthdayve!',
            start: '10-19-2016',
            end: '10-19-2016',
            color: '#C2d85B',
            guests: 50
        });  
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

        // create calendar with options.
        $("#golf-calendar").fullCalendar({

            context: self, // the context for the calendar will be this Schedule class. This is used to toggle events in this viewmodel.
           
            defaultView: this.view || 'agendaWeek',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek'
            },
            theme: false,
            allDaySlot: false,
            weekends: true,
            firstDay: 1,
            dayClick: (date, jsEvent, view) => self.dayClick(date, jsEvent, view),
           
            events: (start, end, timezone, callback) => {

                let data = self.events.map( (event) => {
                    event.editable = !self.isPast( event.start );
                    console.log(event);
                    return event;

                });
                if(data){
                   
                    console.log(callback);
                  
                    callback(self.events);
                }
           
            },
            eventClick: ( event ) => self.eventClick( event ),
               
            editable: true,
            handleWindowResize: true,           
           
            minTime: '07:30:00', // Start time for the calendar
            maxTime: '15:00:00', // End time for the calendar
            columnFormat: {
                week: 'ddd' // Only show day of the week names
            },
            displayEventTime: false,
            allDayText: 'Online/TBD',          
             
                
          
            //eventMouseover: (calEvent) => {
            //    $(calEvent).popover({
            //        title: event.name,
            //        placement: 'right',
            //        trigger: 'manual',
            //        content: 'foo',
            //        container: '#calendar'
            //    }).popover('toggle');
            //}
            
               
        });


       
        
       
       
    }
    isPast(date) { 
        let today = moment().format();
        return moment( today ).isAfter( date );
    }
    
    getGolfMatches() {
        return this.golfMatchDataService.golfmatches
               .then(golfmatches => this.golfmatches = _.sortBy(golfmatches, "GolfMatchId"));   
    }
}