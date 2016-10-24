import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import httpConfig from 'configs/app.http';
import * as log from 'toastr';
import _ from 'underscore';
import {fullCalendar} from 'fullcalendar';

@inject(HttpClient)
export class GolfMatchDataService {

    constructor(http) {
        http.configure(httpConfig);
        this.http = http;          
    }  
  
    get golfMatches() {
        return this.http.fetch('/api/golfmatch/')           
            .then(response => response.json())           
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });           

    }

    getGolfMatches(start, end) {
        return this.http.fetch('/api/golfmatch/daterange/' + start + '/' + end)           
            .then(response => response.json())
            //.then(response => _.sortBy(response, "StartDate"))
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });           

    }
    getUpcomingSchedulesForCurrentUser(displayName) {
        return this.http.fetch('/api/schedule/upcoming/' + displayName)           
            .then(response => response.json())
            //.then(response => _.sortBy(response, "StartDate"))
            .catch(function(ex) {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });           

    }
    getJoinableSchedulesForCurrentUser(displayName){
        return this.http.fetch('/api/schedule/joinable/' + displayName)          
          .then(response => response.json())
          //.then(response => _.sortBy(response, "StartDate"))
          .catch(function(ex) {
              console.log('failed', ex);
              log.error(ex.statusText);
              return;
          });      
    }
    getCreatedSchedulesByCurrentUser(displayName){
        return this.http.fetch('/api/schedule/created/' + displayName)          
          .then(response => response.json())
          //.then(response => _.sortBy(response, "StartDate"))
          .catch(function(ex) {
              console.log('failed', ex);
              log.error(ex.statusText);
              return;
          });      
    }


    getScheduleById(id){
        return this.http.fetch('/api/schedule/' + id)
           .then(response => response.json())
           .catch(function(ex) {
               console.log('failed', ex);
               log.error(ex.statusText);
               return;
           }); 
    }
    getScheduleByDateTime(date, clubName){
        return this.http.fetch('/api/schedule/' + date + '/' + clubName)
           .then(response => response.json())
           .catch(function(ex) {
               console.log('failed', ex);
               log.error(ex.statusText);
               return;
           }); 
    }
    deleteSchedule(id){
        return this.http.fetch('/api/schedule/' + id, 
             { 
                 method: 'delete', 
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 }
             })
            .then(response => response.json())
            .then(data => {
                data.status === "error" ?  log.error(data.message) : log.success('schedule deleted.');
                return;
            })
            .catch((ex)=> {
                console.log('failed', ex);
                log.error(ex.statusText);
                return;
            });
    }
    removePlayerFromSchedule(id, playerId){
        return this.http.fetch('/api/schedule/remove-player/' + id, 
             { 
                 method: 'put', 
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 },
                 body:  JSON.stringify(playerId)      
             })
            .then(response => response.json())
            .then(data => {
                data.status === "error" ?  log.error(data.message) : log.success('schedule edited.');
                return;
            })
            .catch((ex)=> {
                 
                return;
            });

    }
    editSchedule(id, schedule){
        return this.http.fetch('/api/schedule/' + id, 
              { 
                  method: 'put', 
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body:  JSON.stringify(schedule)      
              })
             .then(response => response.json())
             .then(data => {
                 data.status === "error" ?  log.error(data.message) : log.success('schedule edited.');
                 return;
             })
             .catch((ex)=> {
                 
                 return;
             });
    }
    addGolfMatch(match) {
        return this.http.fetch('/api/golfmatch', 
              { 
                  method: 'post', 
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body:  JSON.stringify(match)      
              })
             .then(response => response.json())
             .then(data => {
                 data.status === "error" ?  log.error(data.message) : log.success('Great! Your match has been added!').css("width","500px");
                 
                
                 return;
             })
             .catch((ex)=> {
                 console.log('failed', ex);
                 log.error(ex.statusText);
                 return;
             });
    }
}