import {
  inject, noView, bindable, bindingMode,
  customElement, BindingEngine, inlineView
} from 'aurelia-framework';

import $ from 'jquery';
import moment from  'moment';
import {fullCalendar} from 'fullcalendar';

@customElement('calendar')
@inlineView('<template><require from="fullcalendar/dist/fullcalendar.css"></require></template>')
@inject(Element, BindingEngine)
export class calendar { 
  @bindable dayClick;
  @bindable eventClick;
  @bindable events = [];
  @bindable options;
  @bindable view;

    subscription = null;

    constructor(element, bindingEngine) {
        this.element = element;
        this.bindingEngine = bindingEngine;
      
        this.subscription = this.bindingEngine.collectionObserver(this.events).subscribe( (splices) =>
        { this.eventListChanged(splices) });
    }

    eventListChanged(splices) {
        console.log('eventListChanged');
        if(this.calendar)
            this.calendar.fullCalendar( 'refetchEvents' );

    }
    dayClick(date, jsEvent, view){
        sessionStorage.setItem( "NewMatchStartDate", date );
    }
    eventsChanged(newValue) {

        if(this.subscription !== null) {
            this.subscription.dispose();
        }
        this.subscription = this.bindingEngine.collectionObserver(this.events).subscribe( (splices) => {this.eventListChanged(splices)});
        console.log('eventsChanged');
        if(this.calendar)
            this.calendar.fullCalendar( 'refetchEvents');

    }

    isPast(date) { 
        let today = moment().format();
        return moment( today ).isAfter( date );
    }

    attached() {
        this.calendar = $(this.element);

       
        let defaultOptions = {
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
            dayClick: (date, jsEvent, view) => this.dayClick(date, jsEvent, view),
            eventClick: (event) => this.eventClick(event),
            events: (start, end, timezone, callback) => {

                let data = this.events.map( (event) => {
                    event.editable = !this.isPast( event.start );
                    console.log(event);
                    return event;

                });
                if(data){
                    console.log('hi');
                    console.log(callback);
                  
                    callback(this.events);
                }
           
            },
            
            editable: true,
            handleWindowResize: true,           
           
            minTime: '07:30:00', // Start time for the calendar
            maxTime: '15:00:00', // End time for the calendar
            columnFormat: {
                week: 'ddd' // Only show day of the week names
            },
            displayEventTime: false,
            allDayText: 'Online/TBD'
        };
       

        //console.log(this.calendar.fullCalendar);
        this.calendar.fullCalendar(Object.assign(defaultOptions, this.options));
        
       
    }

}