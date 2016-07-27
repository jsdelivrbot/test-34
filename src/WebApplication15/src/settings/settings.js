import {inject,ObserverLocator,TaskQueue,EventManager,DirtyChecker,SVGAnalyzer} from 'aurelia-framework';
import {Validator} from 'aurelia-validatejs';
import {Customer} from 'models/customer'; 
import {PartType} from 'models/parttype'; 
import {Part} from 'models/part';
import {CustomerDataService} from 'services/dataservices/customer-service';
import {PartTypeDataService} from 'services/dataservices/parttype-service';
import {PartDataService} from 'services/dataservices/part-service';
import {UserDataService} from 'services/dataservices/user-service';
import {Session} from 'services/session';
import * as log from 'toastr';
import _ from 'underscore';
import $ from 'jquery';

@inject(CustomerDataService, PartTypeDataService, PartDataService, UserDataService, Session)
export class Settings{

    heading = 'Settings';

    hasValidated = false;
    validationMessages = [];

    // initial state
    showActivePartsOnly = false;
    isCustomerActive = true;
    isEditingCustomer = false;  
    isAddingCustomer = false;     
    isAddingPartType = false;
    editMode = false;
    partTypeName = "";
    customerName = "";
    //columns = 5;
    //rows = 5;
    isStaggered = false;
    showPartForm = false;    
    selectedUserDefaultPartTypeId = null;

    constructor(customerDataService, partTypeDataService, partDataService, userDataService, session) {               
        this.customerDataService = customerDataService;
        this.partTypeDataService = partTypeDataService;
        this.partDataService = partDataService;
        this.userDataService = userDataService;
        this.session = session;

        // part validation          
        if(typeof validator != 'undefined') {
            this.partValidation = new Validator(this)
             .ensure(this, 'traySize').required();

            // part type validation              
            this.partTypeValidation =   new Validator(this)
             .ensure(this, 'partTypeName').required(); 
        }       
    }
   
    activate(params) {    

        var token = localStorage.getItem('aurelia_authentication');
        this.currentUser = this.session.getCurrentUser(token); 

        // authorization for admin-only view, check for role membership.
        //if(this.currentUser.role[1] !== "admin"){
        //    location.href="/"; 
        //}

        // redisplay if they were previously looking at active parts only
        if(window.localStorage["showActiveParts"]){
            this.showActivePartsOnly =  JSON.parse(window.localStorage["showActiveParts"]);
        }      

        return Promise.all([
            this.getAllCustomers(),
            this.getAllPartTypes(), 
            this.getParts(),
            this.getUsers()
        ]);       
    }
    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    updateColumns(col){
       
        if(this.isNumeric(col)){
            this.columns = col;
        }else{
            this.columns = parseInt(col.srcElement.value);
        }        
    }
    updateRows(row){
       
        if(this.isNumeric(row)){
            this.rows = row;
        }else{
            this.rows = parseInt(row.srcElement.value);
        }
        
    }

    /* Show the Add new part form */
    showPartFormView(){
        this.part = null;
        this.isStaggered = false;
        this.showPartForm = true;
        
        var count = 0;
        var interval = setInterval(() => {                

            // set default for new part as 5 col, 5 rows
            $("#columns").val(5);
            $("#rows").val(5);

            // show the demo layout as 5 col, 5 rows
            this.updateColumns(5);
            this.updateRows(5);

            if(++count === 1){
                window.clearInterval(interval);
            }
          
        },0);
    }

    showEditCustomerView(customer){
        this.isEditingCustomer = true;
        this.isAddingCustomer = false;

        this.customer = customer;
        this.selectedCustomerId = this.customer.CustomerId;
      
    }
    showAddCustomerView(){
        this.isAddingCustomer = true;
        this.isEditingCustomer = false;
        $("#customerName").focus();
    } 
    showAddPartTypeView(){
        this.isAddingPartType = true;
    
    }  
    cancelAddPartType(){
        this.isAddingPartType = false;
    }
    cancelAddCustomer(){
        this.isAddingCustomer = false;
    }
    cancelEditCustomer(){
        this.isEditingCustomer = false;
        
    }
    getCurrentUser(){  
     
        try {
            
            var token = localStorage.getItem('aurelia_authentication');
            let base64Url = token.split('.')[1];
            let base64    =  base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
            this.currentUser = JSON.parse(decodeURIComponent(escape(window.atob(base64))));
            
            return this.currentUser;

        } catch (error) {
            log.error('Unauthorized (no token)');
        }  
      
    }
    toggleEditMode() {
        this.isEditingCustomer = !this.isEditingCustomer;
        if(this.isEditingCustomer ){ 
            this.getAllCustomers();
        }
    }
    getUsers(){
        return this.userDataService.getAllUsers()
              .then(users => this.users = users);
    }
    getCustomer() {
        return this.customerDataService.getCustomerById(this.selectedCustomerId)
               .then(customer => this.customer = customer);
    }
    
    getAllCustomers() {
        return this.customerDataService.getAllCustomers()
               .then(allCustomers => this.allCustomers = _.sortBy(allCustomers, "Name"));   
    }
    
    addCustomer() {      
        
        if(this.customerName){
            var customer = new Customer();
            customer.Name = this.customerName;
            this.isAddingCustomer = false;

            return this.customerDataService.addCustomer(customer).then(()=> this.getAllCustomers()); 
        }

        log.error("Please enter a Customer Name");
    }

    editCustomer() {
        this.isEditingCustomer = false;
        return this.customerDataService.editCustomer(this.selectedCustomerId, this.customer.IsActive)
            .then(()=> this.getAllCustomers());  
    }  

    getAllPartTypes(){

       
        return this.partTypeDataService.parttypes
               .then(allPartTypes => this.allPartTypes =_.sortBy(allPartTypes, "Name"));   
    }
    
    addPartType(){       
     
        var partType = new PartType();
        partType.Name = this.partTypeName;
        
        this.partTypeDataService.addPartType(partType)
            .then(()=> {
                this.partTypeName = "";
                this.isAddingPartType = false;
                this.getAllPartTypes();
            });
        
    }


    updateUsersDefaultPartType(user) {
       
        $(".form-control").hide();
        if(this.selectedUserDefaultPartTypeId){     
            if(this.selectedUserDefaultPartId === 0){
                this.selectedUserDefaultPartId = null;
            }

            user.DefaultPartTypeId = this.selectedUserDefaultPartTypeId;

            return this.userDataService.updateUser(user, this.selectedUserDefaultPartTypeId)
                     .then(u => {
                         log.success('part type updated for this user');
                         this.selectedUserDefaultPartTypeId = null;
                         $(".form-control").show();
                         return this.getUsers();
                     });
        }else{
            $(".form-control").show();
            log.error('no part type selected');
        }
    }
    getParts(){  
        
        return this.partDataService.getAllParts()
             .then(allParts => this.allParts = _.sortBy(allParts, 'CustomerName' ));  
          
    }

    highlightSelectedRow(id){
        this.clearHighlightedRow();
        $("tr#" + id).addClass('highlighted-row');       
    }

    clearHighlightedRow(){
        $("tr").removeClass('highlighted-row');
        $(".parts-form input").removeClass('active-edit');
    }
    /*  Load all the values for selected part into input boxes for editing.  */
    prepareEditPart(partId){    
      
            this.editMode = true;
       
            // get part
            let part = _.findWhere(this.allParts, {PartId: partId}); 
        


            console.log(part);
            this.highlightSelectedRow(part.PartId);
       
            this.partId = part.PartId;       
            this.selectedCustomerId = part.CustomerId;
            this.selectedPartTypeId = part.PartTypeId;
            this.traySize = part.TraySize;        
            this.partNumber = part.PartNumber;
            this.hasAutoGeneratedSerial = part.HasAutoGeneratedSerial;
            this.serialNumberLength = part.SerialNumberLength;        
            this.columns = part.Columns;
            this.rows = part.Rows;
            this.isStaggered = part.IsStaggered;
            this.isActive = part.IsActive;
            this.showPartForm = true;           
          
            var count = 0;
            var interval = setInterval(() => {                

                // set input values for columns and rows to this parts values.
                $("#columns").val(part.Columns);
                $("#rows").val(part.Rows);

                if(++count === 1){
                    window.clearInterval(interval);
                }
          
            },0);

        

    }

    /*  save the edited part.  */
    editPart(){
        if(this.isTraySizeCompatibleWithTrayLayout()){
            this.part = new Part();       
      
            this.part.PartId = this.partId;       
            this.part.CustomerId = this.selectedCustomerId;
            this.part.PartTypeId = this.selectedPartTypeId;
            this.part.TraySize = this.traySize;    
            this.part.PartNumber = this.partNumber;
            this.part.HasAutoGeneratedSerial = this.hasAutoGeneratedSerial;
            this.part.SerialNumberLength = this.serialNumberLength;
            this.part.IsActive = this.isActive;      
            this.part.Columns = this.columns;
            this.part.Rows = this.rows;
            this.part.IsStaggered = this.isStaggered;

            return this.partDataService.editPart(this.part.PartId, this.part)     
                .then(() => {  
                    this.cancelEdit();
              
                })
                .then(() => this.getParts());
        }else{

            log.error("Tray Size (" + this.traySize + ") cannot be greater than the dimensions of the tray!");
        }

    }

    cancelEdit(){
        this.editMode = false;
        this.showPartForm = false;
        this.selectedCustomerId = null;
        this.selectedPartTypeId = null;
        this.traySize = null;       
        this.partNumber = null;
        this.isActive = false;
        this.hasAutoGeneratedSerial = false;
        this.serialNumberLength = null;
        this.columns = null;
        this.rows = null;
        this.isStaggered = false;
      
        this.clearHighlightedRow();
    }    

    /*
    Make sure that the number of parts in a tray is not greater than the dimensions the tray layout allows.
    */
    isTraySizeCompatibleWithTrayLayout(){

        if(this.traySize > (this.columns * this.rows)){
            return false;

        }
        return true;
    }

    addPart(){
       
       
        if(this.partNumber ){

            if(this.isTraySizeCompatibleWithTrayLayout()){
                var part = new Part();
                part.PartNumber = this.partNumber;
                part.PartTypeId = this.selectedPartTypeId;
                part.CustomerId = this.selectedCustomerId;                  
                part.TraySize = this.traySize;
                part.HasAutoGeneratedSerial = this.hasAutoGeneratedSerial;
                part.SerialNumberLength = this.serialNumberLength;
                part.IsActive = true;
                               
                this.showPartForm = false;
                return this.partDataService.addPart(part).then(()=> this.getParts()); 
            }
            else{
                log.error("Tray Size (" + this.traySize + ") cannot be greater than the dimensions of the tray!");
            }
        }
    }

    deletePart(){
       
        return this.partDataService.deletePart(this.partId)
            .then(()=> this.getParts()); 
        
    }
    
   

    sortTable(sortBy){

        this.orderByField = sortBy;
       
        // sort by the selected header, reverse when descending
        this.reverseSort = !this.reverseSort;
        
        this.allParts = _.sortBy(this.allParts, sortBy);   
        
     
        if(this.reverseSort){
            this.allParts = this.allParts.reverse();
        }
    }
}