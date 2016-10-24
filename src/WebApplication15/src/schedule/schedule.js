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
        .ensure('start')
              .isNotEmpty();
    }
   
    attached(){ 
      
            
        $("body").removeClass("is-loading");
        //this.getGolfMatches().then(()=> {
            this.configureCalendar();  
            //$("#upcoming-matches-header").velocity('slideDownIn');       
            //$("#golf-calendar").velocity('slideDownIn'); 
           
        //});   
        
        
    }

    activate(){
        let self = this;
        this.currentUser = this.session.getCurrentUser();      
       
        this.showUndo = false;
        // this.clearSessionStorage();
       
    } 
    /* Calendar */   
    
    eventClick(event){  
        
        console.log(event);

        let model = {
            match: event,
            mode: "view",
            context: this
        };
        
        // Aurelia dialog
        this.dialogService.open({ viewModel: MatchModal, model: model}).then(response => {

         
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

    processMatch(match){
        console.log('made it!');
        console.log(match);
    }

    /*
      Clicking on day (not an event) will show create new match dialog.
    */    
    dayClick(date, jsEvent, view){

        jsEvent.start = date;
        jsEvent.time = moment(date).format('HH:mm');
        jsEvent.numberOfHoles = 9;

        let currentView = $("#golf-calendar").fullCalendar( 'getView' );       
        if(currentView.type === 'month'){
            // display on calendar nicely, set time to current time.            
            jsEvent.time = moment().format('HH:mm');
        }
       
        // prepare the model for the dialog.
        var model = {
            match: jsEvent,
            mode: "create",           
            context: this
        };
        
        this.dialogService.openAndYieldController({ viewModel: MatchModal, model: model});
    }     
 
    /* setup the calendar */
    configureCalendar(schedule){

        // get events for calendar.
        this.events = [];
        
        let self = this;

        // create calendar with options.
        $("#golf-calendar").fullCalendar({

            context: self, // the context for the calendar will be this Schedule class. This is used to toggle events in this viewmodel.
            defaultView: 'month',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,listMonth'
            },
            theme: false,
            allDaySlot: false,
            weekends: true,
            firstDay: 1,
            dayClick: (date, jsEvent, view) => self.dayClick(date, jsEvent, view),
           
            events: (start, end, timezone, callback) => {

                this.events = [];
                
                this.golfMatchDataService.getGolfMatches(start, end)
                            .then(golfmatches => self.golfmatches = _.sortBy(golfmatches, "GolfMatchId"))
                            .then(() => {
                               
                                if(self.golfmatches){

                                    // make event objects out of golfmatches                                   
                                    for (var i = 0; i < self.golfmatches.length; i++) {           
                
                                        let start =  moment(self.golfmatches[i].GolfMatchDateIso).format('MM-DD-YYYY');
                                       
                                        let isCurrentUserInMatch, isCurrentUserCreator = false;
                                      
                                        // check if current user is in this match and if so, if they're the creator.
                                        for (var j = 0; j < self.golfmatches[i].Players.length; j++) {
                                            if(self.golfmatches[i].Players[j].DisplayName == self.currentUser.displayName ){
                                                isCurrentUserInMatch = true;

                                                if(self.golfmatches[i].Players[j].IsMatchCreator){
                                                    isCurrentUserCreator = true;
                                                }
                                            }
                                        }

                                        // set the match color.                                       
                                        let backgroundColor = "#C2b85B";
                                        if(!isCurrentUserInMatch)
                                            backgroundColor = "#C2185B";

                                        let formattedTime = moment(self.golfmatches[i].GolfMatchDateIso).format('LT');
                                        this.events.push({  
                                            title: formattedTime, 
                                            start: start, 
                                            time: self.golfmatches[i].Time,
                                            allDay : false,    
                                            textColor: "#fff",
                                            backgroundColor: backgroundColor,
                                            id: self.golfmatches[i].ScheduleId,
                                            numberOfHoles: self.golfmatches[i].NumberOfHoles,
                                            players: self.golfmatches[i].Players,
                                            
                                            isCurrentUserCreator: isCurrentUserCreator
                                        });                
                                    }     
                                }

                                this.events.map( (event) => {
                                    event.editable = !self.isPast( event.start );
                                    console.log(event);
                                    return event;
                                });
                           
                            }).then(()=>{
                                callback( self.events );  
                            });   
              
                
           
            },
            eventClick: ( event ) => self.eventClick( event ),
           
            editable: true,
            handleWindowResize: true, 
            minTime: '07:30:00', // Start time for the calendar
            maxTime: '15:00:00', // End time for the calendar
            displayEventTime: false,
            
            eventMouseover: function(calEvent, jsEvent) {
                var tooltip = '<div class="tooltipevent" style="width:200px;padding:10px;height:auto;background:#000;color:#fff;position:absolute;z-index:10001;">' + calEvent.title + '</div>';
                $("body").append(tooltip);
                $(this).mouseover(function(e) {
                    $(this).css('z-index', 10000);
                    $('.tooltipevent').fadeIn('500');
                    $('.tooltipevent').fadeTo('10', 1.9);
                }).mousemove(function(e) {
                    $('.tooltipevent').css('top', e.pageY + 10);
                    $('.tooltipevent').css('left', e.pageX + 20);
                });
            },

            eventMouseout: function(calEvent, jsEvent) {
                $(this).css('z-index', 8);
                $('.tooltipevent').remove();
            },
        });


       
        
       
       
    }
    isPast(date) { 
        let today = moment().format();
        return moment( today ).isAfter( date );
    }
    
    
}