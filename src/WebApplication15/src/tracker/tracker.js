import {inject} from 'aurelia-framework';
import {CustomerDataService} from 'services/dataservices/customer-service';
import {PartTypeDataService} from 'services/dataservices/parttype-service';
import {PartDataService} from 'services/dataservices/part-service';
import {SerialDataService} from 'services/dataservices/serial-service';
import {TrayDataService} from 'services/dataservices/tray-service';
import {ExportDataService} from 'services/dataservices/export-service';
import {StockDataService} from 'services/dataservices/stock-service';
import {DialogService} from 'aurelia-dialog';
import {Tray} from 'models/tray';
import {Serial} from 'models/serial';
import {Session} from 'services/session';
import * as log from 'toastr';
import _ from 'underscore';
import $ from 'jquery';
import moment from 'moment';
import {introJs} from 'intro.js';
import * as velocity from 'aurelia-animator-velocity';
import skeljs from 'skeljs';
import 'utiljs';
import 'mainSkeljs';


@inject(DialogService, CustomerDataService, PartTypeDataService, PartDataService, 
    SerialDataService, TrayDataService, ExportDataService, StockDataService, Session)
export class Tracker { 

    heading = 'Tracker';
    noResultsMsg = 'no results found';
    isMobile = false;

    constructor(dialogService, customerDataService, partTypeDataService, partDataService, 
        serialDataService, trayDataService, exportDataService, stockDataService, session) { 

            this.dialogService = dialogService;         
            this.customerDataService = customerDataService;
            this.partTypeDataService = partTypeDataService;
            this.partDataService = partDataService;
            this.serialDataService = serialDataService;
            this.trayDataService = trayDataService;
            this.exportDataService = exportDataService;
            this.stockDataService = stockDataService;
            this.session = session;  
    }

   
    loadDefaults() {
       
        this.trayLocked = false;
        this.partLocked = false;
        this.searchByTray = true;

        this.selectedTrays = [];
        this.selectedTraysSerials = [];
        this.searchOptions = [];
        this.modeOptions = [];
        this.searchResults = [];
        this.searchMessage = "";
        this.serialsExpanded = false;

        this.todaysDate = moment(new Date()).format('MM/DD/YY');
        // todo: change when we get another customer. navigationInstruction.title;
        this.selectedCustomer = "L3"; 
            
        this.searchOptions.push("Serial");
        this.searchOptions.push("Tray");
        this.selectedSearch = "Serial";

        this.modeOptions.push("QC");
        this.modeOptions.push("Shipping");     
        this.selectedMode = "QC";
                
        // set the default view for tray list
        this.trayView = 'This Week';
        this.trayValid = true;
    }
   
    activate(params, navigationInstruction) { 
        var self = this;

        // todo: uncomment this when going live:
        // prevent accidental navigating away
        //window.onbeforeunload = (evt) => {
        //    var message = 'Are you sure you want to leave?';
        //    if (typeof evt == 'undefined') {
        //        evt = window.event;
        //    }
        //    if (evt) {
        //        evt.returnValue = message;
        //    }
        //    return message;
        //}
              
        this.loadDefaults();
        
        // get the current user
        var token = localStorage.getItem('aurelia_authentication');
        this.currentUser = this.session.getCurrentUser(token);  
             
        // set the users default part type, if available
        if(this.currentUser.defaultPartTypeId){              
            this.selectedPartTypeId = this.currentUser.defaultPartTypeId;               
            this.getAllPartsByCustomerAndPartType(); 
        } 
        
        return Promise.all([     
           this.getAllPartTypes(),        
           this.getAllPartsByCustomerAndPartType()
        ]);
    }  

    attached(){        
      
        var self = this;         
        
        /* set default dates for Shipping search */
        this.stockSearchStartDate = moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD');
        this.stockSearchEndDate = moment(new Date()).add(1, 'days').format('YYYY-MM-DD');
        
        this.setSelectedPart();
        $('.selected-trays').on('show.bs.collapse', (e)=> {
            this.serialsExpanded = true;
        });
        $('.selected-trays').on('hidden.bs.collapse', (e)=> {
            this.serialsExpanded = false;
        });
    }

    /*
     Tray layout.
     Apply configured columns and rows and staggered for selected part.
    */
    setTrayLayout() {
          
        // "129" is the width of the column. "44" is a final padding number.
        if(this.part){
            var val = 129 * this.part.Columns + 44;
            //console.log(val);
            document.getElementById( "trayDiv" ).style.width = val + "px";
        }
    }
    

    /**
    * Barcode check.
    * Automatically submits the tray number on Enter (or when tray number is scanned in).
    * @function   
    */  
    scanCheck(e){     
 
        this.clearSerialInputs();
  
        if(e && e.which === 13){ // 13 = enter key  
            
            let trayNumber = this.trayNumber;
          
            if(this.selectedMode === 'Shipping'){
                   
                this.addTrayToSelectedTraysList();
                log.success("Adding tray # " + trayNumber+ " to list");
            }
            else
            {
                this.setTrayNumber();
                log.success("<span><i class='fa fa-barcode'></i></span>" + "  # " +  trayNumber);
            }         
        }
    }
    
  
    /**
    * 
    * Show help tutorial.
    * @function   
    */    
    showIntroHelp(){
        introJs().start();
    }   
    
    /**
        QA - *only when the user has their part type settings set to "All"
      * Returns all part types      
      * @function   
      */ 
    getAllPartTypes() {
        return this.partTypeDataService.parttypes
               .then(allPartTypes => this.allPartTypes = _.sortBy(allPartTypes, "Name"))
               .then((allPartTypes)=>{          
                   this.selectedPartType = _.findWhere(this.allPartTypes, {PartTypeId: parseInt(this.selectedPartTypeId) }); 
               });   
    }

    /**
       QC
     * Part Type selected option change event. 
     * Returns all part numbers for the selected part type.
     * @function   
     */  
    getAllPartsByCustomerAndPartType() {     
        if(this.selectedPartTypeId > 0){
            // get all part#'s for this customer and part type combination
            return this.partDataService.getAllPartsByCustomerAndPartType("L3", this.selectedPartTypeId)
                 .then(allParts =>                
                 {
                     this.selectedPartId = 0;
                     this.allParts = _.sortBy(allParts, "PartNumber");                
                 });   
        }
    }

    


    /**
    * Shipping
    * Validate and add a new Tray number to shipment list. Calls setSelectedTrays.
    * @function   
    */    
    addTrayToSelectedTraysList(){
        
        if(!this.trayNumber){
            $("#trayNumber").velocity('callout.flash');            
            return; 
        }
        // check the checkbox of the available tray with this tray number. 
        $("input.selectedTrays[value=" + this.trayNumber + "]").prop("checked", true);

        this.setSelectedTrays();

        // clear out the tray number for the next Tray to be entered.
        this.trayNumber = "";
    }      

    /**
     * Shipping 
     * Removes a selected tray from the shipment list. 
     * @function
     * @param {string} trayNumber - the traynumber to remove.    
     */ 
    removeTrayFromSelectedTraysList(trayNumber){       
        let indexOfTray = this.selectedTrays.indexOf(trayNumber);
        if(indexOfTray !== -1){
            this.selectedTrays.splice(indexOfTray, 1);                    
        }
    }

    /**
     * Shipping 
     * Adds all selected trays to shipment list. Selected trays share the same class.
     @param $ev checked or unchecked.
     * @function   
     */ 
    setSelectedTrays($ev, tray){        

      //   see if it's checked or unchecked.
        //var $selectedTray = $('.selectedTrays :input[value=' + tray.TrayNumber + ']');
        //console.log($selectedTray);
        
        var selected = document.getElementsByClassName("selectedTrays");   

        this.selectedTraysSerials =[];
        this.selectedTrays = [];

        for (var i = 0; i < selected.length; i++) {
           
            // if the tray isn't already in the list, add it in.
            if(selected[i].checked){
                let indexOfTray = this.selectedTrays.indexOf(selected[i].value);
               
                if(indexOfTray === -1){
                    this.selectedTrays.push(selected[i].value); 
                    this.showSerials(selected[i].value);
                }
            }            
        }
        this.selectedTrays.sort();
    }
     
   
    /**
    * Shipping 
    * Gets all the serials for the selected tray. 
    * @function   
    * @param {string} trayNumber - the traynumber whose serials to return.    
    */ 
    showSerials(trayNumber){
        this.selectedTraysSerials = [];

        this.trayDataService
            .getTrayByTrayNumber(trayNumber, this.selectedPartId)
            .then((data) => {

                if(!data){
                    log.info(this.noResultsMsg);
                }
                else
                {
                    for(var j = 0; j < data.Serials.length; j++){
                        
                        if(data.Serials[j] && data.Serials[j].SerialNumber){
                            this.selectedTraysSerials.push(data.Serials[j]);
                        }
                    }
                }
                                
            });
    }

    /**
   * Search by Tray Number or Serial Number.
   * @function     
   */ 
    search(key){
        this.searchMessage = "";

        if(!key || key === 13){

            this.searchTray = {};
        
            if(this.searchItem){
                this.searchItem = this.searchItem.replace(/\*/g,'');
                if(this.selectedSearch == "Serial"){
                
                    // by Serial #
                    return this.trayDataService.searchTrayBySerialNumber(this.searchItem, this.selectedPartId)
                        .then((data) => {
                            this.processSearchResults(data, this.selectedSearch); 
                            
                        });
                }
                else        
                {      
                    // by Tray #
                    return this.trayDataService.searchTrayByTrayNumber(this.searchItem, this.selectedPartId)
                        .then((data) => {
                            this.processSearchResults(data, this.selectedSearch);                      
                        });
                }
            }
        }
    }

    /**
   * Clear search results
   * @function   
   */ 
    clearSearchInput(){
        $("#searchinput").val('');
        this.searchResults = [];
        this.searchMessage = "";

    }


    /**
   * Process results of Search.
   * @function   
   * @param {json [array]} results - the results of the search.  
   * @param {searchBy} - the searchBy term (serial or tray).  
   */ 
    processSearchResults(results, searchBy){
        
        if(!results || results.length === 0){
            log.error(this.noResultsMsg + " for " + searchBy + " # " + this.searchItem);
            
            this.searchResults = [];
            return;
        }

        this.searchMessage = "found " + results.length + " result" + (results.length === 1 ? "" : "s") + " for '" + this.searchItem + "'";

        this.searchResults = results;
    }
   
    /**
  * Export a list of trays or a single tray if no list is provided. 
  * Calls ExportDataService and returns a downloaded PDF.
  * @function   
  * @param {array} trays - the list of trays to export.        
  */ 
    printTray(trays){
    
        let traysToExport = [];

        if(trays){        
            for (var i = 0; i < trays.length; i++) {
                traysToExport.push( trays[i] );
            }
        }
        else
        {      
            traysToExport.push( this.trayNumber );  
        }
             
        this.exportDataService.getExport(this.selectedPartId, traysToExport.join());
    }

    /**
  * Set the tray number and grabs existing serials for that tray.   *
  * @function            
  */ 
    setTrayNumber(){       
       
        if( !this.trayNumber ){

            $("#trayNumber").velocity('callout.flash');
            log.error('Please enter a Tray Number first!');
            return;
        }        
        
        this.partLocked, this.trayLocked = true;      
        
        this.setSerialNumbersForTray(this.trayNumber);             
       
        this.setTrayLayout();

      
    }
    
    /**
   * Prepares the serial tray for entries and edits.
   * @function            
   */ 
    setSerialNumbersForTray(previousSelectedTrayNumber){
       
        // reset all messages
        this.clearValidationMessagesFromTray();       
        this.clearExportMessages();      
        this.clearSerialNumbersFromTray();

        // find the tray
        this.trayNumber = previousSelectedTrayNumber;

        let tray = this.createTray();    

        //this.trayDataService.addTray(tray).then(() =>{
        var self = this;

        // todo: issue was sending blank trayid on tab, and tray wasnt saving before parts entered
        
        this.trayDataService.getTrayByTrayNumber(this.trayNumber, this.selectedPartId)
        .then((tray)=> this.tray = tray)
        .then(()=> {  


            // if there is a tray, load the serials
            if(self.tray && self.tray.Serials){
                
                for (var i = 0; i < self.tray.Serials.length; i++) {                
                    $(".serial-text#serial_" + self.tray.Serials[i].TrayPosition).val(self.tray.Serials[i].SerialNumber);
                }  
                return Promise.resolve();
            }else{
                // if not a tray yet, create a new tray
                log.info('saving new tray...');
                self.trayValid = true;
                $('.serial-text').prop('readonly', true);


               return self.saveTray().then(()=>{
                    $('.serial-text').prop('readonly', false);
                    log.success('saved!');
                });
            }
                
        })
        .then((tray) => {          
                         
            this.partLocked = true;
            
            // perform a validation to trigger the textbox feedback colors.         
            this.validate();
        });

        //});
    }  
      

    /**
    * Edit button event.
    * @function            
    */ 
    editTray()
    {       
        this.trayLocked = true;
    }

   
  
  
    /**
        Tray views
   */ 
  
    getAllTraysToday(){
        return this.trayDataService.getAllTraysToday(this.selectedPartId)
             .then((traysToday)=> {
                 
                 this.traysToday = traysToday
               
             });
    }
    getAllTraysThisWeek(){
        return this.trayDataService.getAllTraysThisWeek(this.selectedPartId)
            .then((trays)=> {
                
               
                this.traysThisWeek = trays;
            });
    }
    
    getAllPartialTrays(){
        return this.trayDataService.getAllPartialTrays(this.selectedPartId)
            .then((trays)=> {
             
                this.partialTrays = trays
            
            });
    }
    getAllTraysAvailableForStock(){
        return this.trayDataService.getAllTraysAvailableForStock(this.selectedPartId)
             .then((trays)=> {
                 this.allTraysAvailableForStock = trays;              
             });
    }
  
    showAllTrays(){    
        this.trayView = "All";   
        this.allTrays = this.getTrays();
    }
    showPartialTrays(){
        this.trayView = "Partial Trays";
        this.trays = this.partialTrays;
    }
    showTodayTrays(){
        this.trayView = "Today";
        this.trays = this.traysToday;
    }
    showThisWeeksTrays(){
        this.trayView = "This Week";
        this.trays = this.traysThisWeek;
    }
     
    // Shipping
    showAvailableTrayView(){
        this.viewingAvailableTrays = true;
        this.viewingShippedTrays = false;        
    }   
    // Shipping
    showShippedTrayView(){
        this.viewingAvailableTrays = false;
        this.viewingShippedTrays = true;      
    }  

        
    /**
    Shipping
    * Stock selected event. Gets the tray numbers that are part of that stock.
    * @function  
    * @param {number} stockId - the id of the stock to query.
    */   
    getStockSearchTrayResults(stockId){

        $("tr").removeClass('selected-row');
        $("tr#" + stockId).addClass('selected-row'); 

        this.selectedStockId = stockId;

        this.stockSearchTrayResults = [];      
        this.stockSearchTrayNumbers = [];

        this.trayDataService.getTraysByStockId(stockId)
            .then((trays) =>{
                this.stockSearchTrayResults = trays;
        });
    }

    /**
    Shipping
    * Tray selected event. Gets the serial numbers that are part of that tray number.
    * @function  
    * @param {object} tray - the tray whose serial numbers to show.
    */  
    getStockSearchSerialResults(tray){

        //this.stockSearchSerialResults = [];

        $("tr.tray-row").removeClass('selected-row');
        $("tr#" + tray.TrayNumber).addClass('selected-row'); 
        console.log('saving TrayId getStockSearchSerialResults');
        this.selectedTrayNumber = tray.TrayNumber;
        this.selectedTrayId = tray.TrayId;

        this.trayDataService.getTrayByTrayNumber(this.selectedTrayNumber, this.selectedPartId)
            .then((tray)=>{
                this.stockSearchSerialResults = tray.Serials;
        })
       
    }

    /**
    Shipping
    * Search event for date range. Loads stockSearchResults with all stocks in set date range.
    * @function   
    */  
    getStockByDates(){
        
        this.stockSearchTrayResults = [];
        this.stockSearchResults = [];
        this.stockSearchSerialResults = [];

        this.showNoResultsFound = false; 

        return this.stockDataService.getStockByDates(this.selectedPartId, this.stockSearchStartDate, this.stockSearchEndDate)
           .then((result) => {              
             
               if(result.length === 0){
                   this.showNoResultsFound = true;
               }

               if(result){

                   this.stockSearchTrayNumbers = [];
                   this.stockSearchResults = [];

                   for (var i = 0; i < result.length; i++) {
                       this.stockSearchResults.push(result[i]);
                   }
               }             
           });
    }


    /**
    Shipping
    * Clears all results from previous stock query.
    * @function   
    */  
    refreshStock(){
        this.selectedTraysSerials = [];
        this.selectedTrays = [];  
        this.stockSearchTrayNumbers = [];
        
        this.comments = "";   

        // uncheck all the tray numbers in Available Trays list.
        $("input.selectedTrays").prop("checked", false);
    }


    /**
    Shipping 
    * Reprints all the serials of the currently selected stock.
    * @function   
    */  
    reprintStock(){       

        for (var i = 0; i < this.stockSearchTrayResults.length; i++) {
            this.stockSearchTrayNumbers.push(this.stockSearchTrayResults[i].TrayNumber);
        }

        this.printTray(this.stockSearchTrayNumbers);

        log.success('reprinted!');

        this.refreshStock();  

        this.getAllTraysAvailableForStock();
    }
    
    /**
    Shipping
    * Creates a new Stock.
    * @constructor   
    */  
    createStock(){
        var stock = {
            StockDate: moment(),         
            Comments: this.comments,
            PartId: this.selectedPartId,
            TrayNumbers: []
        }

        return stock;
    }

    /**
    Shipping 
    * Saves a new stock to the database.
    * @function   
    */  
    addToStock(){

        var stock = this.createStock();      

        for (var i = 0; i < this.selectedTrays.length; i++) {
            stock.TrayNumbers.push(this.selectedTrays[i]);
        }
        
        this.stockDataService.addStock(stock)            
            .then((result) => {

                if(result && result.StockId){

                    this.printTray(this.selectedTrays);

                    log.success('stock saved!');
                    this.refreshStock();                
                }
            })
            .then(()=> this.getAllTraysAvailableForStock());          
    }

    /**
    Shipping - *admin only*
    * Removes all trays from the selected stock. Useful to generate a new shipment.
    * @function   
    */  
    clearSelectedStock(){
        this.stockDataService.clearStock(this.selectedStockId)
           .then((result) => {             
               this.getAllTraysAvailableForStock().then(() => {
                   this.refreshStock();
                   this.getStockByDates();
               });             
           });
    }

    /**
   Shipping - *admin only*
   * Removes all serials from the selected tray. Useful to add a tray to a different shipment.
   * @function   
   */  
    clearSelectedTray(){
        this.stockDataService.clearTray(this.selectedTrayId)
           .then((result) => {
               this.getAllTraysAvailableForStock().then(() => {
                   this.refreshStock();
                   this.getStockByDates();
               });
           });
    }
     
  
    /**
     QA 
   * Returns a new tray with serial numbers for sending to database.
   * @function   
   */  
    createTray(){
     
        let tray = new Tray(this.selectedPartId,  this.trayNumber, this.part.TraySize, this.currentUser.nameid);

        let serialNumberList = [];
        let i = 0;
        $(".serial-text").each(function() {
            
            i++;
            let serial = "";

            if($(this).val() !== ""){
                serial = $(this).val();
            }

            tray.Serials.push({ SerialNumber: serial, TrayPosition: i  });
            serialNumberList.push(serial);      
          
        });

        return tray;
    }

    /**
     QA 
   * Saves a tray to the database.
   * @function   
   */  
    saveTray(){        
     
        if(this.trayValid){

            this.showSavingMessage = true;
            
            let tray = this.createTray();        
     
           
            this.trayDataService.addTray(tray)
                .then((data) => {
                   
                    if(data && data.status === "error")
                    {   
                        log.error(data.message);

                        // force the user to change the duplicated serial by making the rest readonly.
                        $('.serial-text').prop('readonly', true);

                        // allow edit of the duplicated serial textboxes.
                        $("#serial_" + data.position).closest('.input-group').removeClass('has-success has-feedback');
                        $("#serial_" + data.position).closest('.background').addClass('alert-danger');                        
                        $("#serial_" + data.position).closest('.input-group').velocity("callout.pulse");
                        $("#serial_" + data.position).prop('readonly', false);

                        this.errorMessage = data.message;                        
                        this.trayValid = false;                  
                        this.showError = true;
                        $("#serial_" + data.position).closest('.input-group').addClass('has-error has-feedback'); 
                    }
                    else
                    { 
                        $('.serial-text').prop('readonly', false);     
                        this.trayValid = true;
                        this.tray = data;
                        console.log('this tray');
                        console.log(data);
                    }
                    setTimeout(()=> this.showSavingMessage = false, 500); 
                });
        }
    }

    /**
      QA 
    * The current tray is "Confirmed". We can clear out the serial form for the next tray to be processed.
    * @function   
    */  
    confirmTray(){      
        log.success('Saved - ready for next tray');
        this.refreshTrayView();        
    }
   
    /**
       QA 
     * Make Enter key perform just like Tab key.
     */ 
    enterToTab(evt){

        if (evt.keyCode == 13 && !evt.shiftKey) {

            let result = evt.srcElement.id.replace('serial_','');
            $('#serial_' + (++result)).focus();                  
            return false;
        }

        if (evt.keyCode == 13 && evt.shiftKey) {

            let result = evt.srcElement.id.replace('serial_','');
            $('#serial_' + (--result)).focus();                  
            return false;
        }

        return true;
    }

    /**
      QA 
    * Check the tray for errors (duplicates, serial length) and show results.
    * If saveTrayAfterValidation is true, it calls SaveTray() if all serials are vlai.
    * @function   
    */   
    validate(serialElement){       

        let self = this;  
        this.trayValid = true; 
        this.showError = false;

        this.errorMessage = "";      
        let serialNumberList = [];
        let i = 0;    

        // clear previous validations
        $('.background').removeClass('alert-danger text-danger has-success');
        $(".serial-text").closest('.input-group').removeClass('has-error'); 
       
        // validate each serial
        $(".serial-text").each(function() {

            i++;             
            let serial = $(this).val();

            if(serial){
                
                // check - duplication.
                // is this serial already in the list?
                var duplicate = _.findWhere(serialNumberList, {serial: serial});                
                if(duplicate)
                {                     
                    var dup1 = duplicate.position;
                    var dup2 = i;

                    // force the user to change the duplicated serial by making the rest readonly.
                    $('.serial-text').prop('readonly', true);

                    // allow edit of the duplicated serial textboxes.

                    // update css
                    // remove previous classes
                    $("#serial_" + dup1).closest('.input-group').removeClass('has-success');  
                    $("#serial_" + dup2).closest('.input-group').removeClass('has-success');
                    
                    // add error classes
                    $("#serial_" + dup1).closest('.input-group').addClass('has-error');  
                    $("#serial_" + dup2).closest('.input-group').addClass('has-error');  
                    $("#serial_" + dup1).closest('.background').addClass('alert-danger');
                    $("#serial_" + dup2).closest('.background').addClass('alert-danger');     
                    
                    // allow editing of the error serials only.
                    $("#serial_" + dup1).prop('readonly', false);
                    $("#serial_" + dup2).prop('readonly', false);

                    $("#serial_" + dup1).closest('.input-group').velocity("callout.pulse");
                    $("#serial_" + dup2).closest('.input-group').velocity("callout.pulse");

                    self.showError = true;
                    self.trayValid = false;
                    self.errorMessage = 'Serials in positions ' + dup1 + ' and ' + dup2 + ' are duplicates.';
                   
                }
                else
                {
                    // check - serial length.      
                    if(serial.length !== self.serialNumberLength)
                    {                          
                        $("#serial_" + i).closest('.input-group').addClass('has-error has-feedback');  

                        self.showError = true;
                        self.trayValid = false;                    
                        self.errorMessage = '#' + i + " serial# must be " + self.serialNumberLength + " characters long!";   
                  
                    }
                    else
                    {   
                        //$('.background').removeClass('alert-danger text-danger has-success');
                        //$("#serial_" + i).closest('.input-group').removeClass('has-error'); 
                        
                        serialNumberList.push({
                            serial: serial,
                            position: i
                        });

                        if(self.trayValid){
                            $("#serial_" + i).prop('readonly', false);
                        }

                        $("#serial_" + i).closest('.input-group').addClass('has-success has-feedback');
                    }     
                }
            }
        });    

       
        if(serialElement && this.trayValid){                       
         
            let serialNumber = $("#" + serialElement.srcElement.id)[0].value;              
            let trayposition = serialElement.srcElement.id.replace("serial_","");  
                
            this.saveSerialNumberInTray(this.tray.TrayId, trayposition, serialNumber);
        }
    }
   
   
    saveSerialNumberInTray(trayid, trayposition, serialNumber){

        if(this.trayValid){
            this.trayDataService.saveSerialNumberInTray(trayid, trayposition, serialNumber)
                    .then((data) => {
                   
                        if(data && data.status === "error")
                        {   
                            
                            this.trayValid = false;    
                       
                            log.error(data.message);

                            // force the user to change the duplicated serial by making the rest readonly.
                            $('.serial-text').prop('readonly', true);                           

                            // allow edit of the duplicated serial textboxes. Note: highlighting the tray position at its location in the *current* tray.
                            $("#serial_" + trayposition).closest('.input-group').removeClass('has-success has-feedback');
                            $("#serial_" + trayposition).closest('.background').addClass('alert-danger');
                            $("#serial_" + trayposition).prop('readonly', false);
                            $("#serial_" + trayposition).closest('.input-group').velocity("callout.pulse");

                            this.errorMessage = data.message;                        
                                         
                            this.showError = true;
                            $("#serial_" + trayposition).closest('.input-group').addClass('has-error has-feedback'); 
                        }
                        else
                        { 
                            this.trayValid = true;
                            $('.serial-text').prop('readonly', false);
                        }
                        setTimeout(()=> this.showSavingMessage = false, 500); 
                    });

        }

    }

    /**     
   * QA or Shipping (selected mode) radio button change event. Flips to the other side.
   * @function   
   */ 
    setSelectedMode(){
        
        this.clearSerialInputs();
      
        this.trayNumber = null;  
        $('.card').toggleClass('flipped');
        $('.add-tray').velocity('callout.pulse');  
       
        this.trayNumberHasFocus = true;      

        if(this.selectedMode === 'Shipping'){
            //this.allTraysAvailableForStock = [];             
            this.getAllTraysAvailableForStock();
            this.showAvailableTrayView();  
        }
    }


    /**
   * Sets all values related to the selected part number. 
   * @function    
   */ 
    setSelectedPart(){
    
        if(!this.selectedPartId && !this.partLocked){
            $("#selectedPartId").velocity("callout.shake");            
            return;
        }    

        this.reset();
        this.clearSearchInput();
        this.partLocked = true;
       
        this.part = _.findWhere(this.allParts, {PartId: this.selectedPartId}); 
        
        this.serialNumberLength = this.part.SerialNumberLength; 
        this.selectedPartNumber = this.part.PartNumber;
        this.selectedTraySize = this.part.TraySize;
       
        this.refreshTrayView();

        if(this.selectedMode === 'Shipping'){           
        this.getAllTraysAvailableForStock();
         }

        this.setTrayLayout();
    }

    /**     
     * Change selected part event. Sets the "lock" and "unlock" button on selected Part #.   
     * @function   
     */ 
    togglePartSelection(){  

        // clear the part number, this will hide other elements until a part is selected.
        this.selectedPartNumber = ""; 
        this.clearSerialInputs();

        // check if they selected "--select part--" option.
        if(!this.selectedPartId && !this.partLocked){
            $("#selectedPartId").velocity("callout.shake");
            this.partLocked = false;
            return false;
        }       
        
        // check if they didn't change the currently selected part number.
        if(this.selectedPartId && !this.partLocked && this.part)
        {               
            this.setSelectedPart(); 
        }
        else {
            this.partLocked = !this.partLocked;
        }        
    }

    
    

    

    /**
       Clear messages
  */ 
    clearExportMessages(){
        this.fileName = "";
        this.exportMessage = "";
    }
    clearValidationMessagesFromTray(){
        $('.input-group').removeClass('has-error has-success has-feedback');
    }
    

    /**     
   * Clears all serials from tray
   * @function   
   */ 
    clearSerialNumbersFromTray(){

        $(".serial-text").val("");       
        this.serialNumberList = [];   
    }

    /**     
    * Clears out all the serial number text boxes.  
    * @function   
    */ 
    clearSerialInputs(){
        let i = 0;
        $(".serial-text").each(function() {
            i = i + 1;
            $("#serial_" + i).val("");
            $("#serial_" + i).closest('.input-group').removeClass('has-error has-feedback');
            $("#serial_" + i).closest('.input-group').removeClass('has-success has-feedback');
        });
    }

   

    /**     
    * When changing selected part, or when tray is confirmed, this will refresh the view.
    * @function   
    */ 
    refreshTrayView(){
                 
        this.clearValidationMessagesFromTray();
        this.clearSerialNumbersFromTray();        
           
        this.errorMessage, this.trayNumber = "";      
        this.tray = null;
        this.searchTray = null;
        this.trayLocked = false; 
      
        this.showError = false;            
        this.trayNumberHasFocus = true;
        
        return Promise.all([  
           this.getAllTraysToday(),                 
           this.getAllTraysThisWeek(),
           this.getAllPartialTrays(),
        ]).then(()=>{
            if(this.trayView = "This Week"){
                this.showThisWeeksTrays();   
            }
        }); 
    }

    /**     
    * Resets all values in UI.
    * @function   
    */ 
    reset(){
        
        this.part = null;
        this.searchTray = null;
        this.selectedPartNumber = null;
        this.allTrays = [];
        this.trays = [];        
        this.partialTrays = [];     
        this.traysThisWeek = []; 
        this.traysToday = [];
        this.today = [];        
        this.stockSearchTrayResults = [];
        this.stockSearchSerialResults = [];
        this.stockSearchResults = [];
    }
}


