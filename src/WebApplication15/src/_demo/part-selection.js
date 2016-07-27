import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {Customer} from 'models/customer'; 
import {PartType} from 'models/parttype'; 
import {Part} from 'models/part';
import {CustomerDataService} from 'services/dataservices/customer-service';
import {PartTypeDataService} from 'services/dataservices/parttype-service';
import {PartDataService} from 'services/dataservices/part-service';
import _ from 'underscore';

@inject(DialogController, CustomerDataService, PartTypeDataService, PartDataService)
export class PartSelection {
    question = "Please select a Part";
    selectedPart = { PartNumber: '', PartType: '' };
  
    constructor(DialogController, customerDataService, partTypeDataService, partDataService){
        this.controller = DialogController;

        DialogController.settings.lock = false;
        DialogController.settings.centerHorizontalOnly = true;

        this.customerDataService = customerDataService;
        this.partTypeDataService = partTypeDataService;
        this.partDataService = partDataService;
        
    }
   
    activate(selectedPart){

        this.selectedPart = selectedPart;     

        return Promise.all([          
           this.getAllPartTypes()
        ]);  
    }

    attached(){    
        $('#myModal3').velocity('transition.flipBounceYIn');
    }

  
    cancel(){
        alert('cancel');
    }
    ok(){

        this.part = _.findWhere(this.allParts, {PartId: this.selectedPartId});

        this.serialNumberLength = this.part.SerialNumberLength; 
        this.selectedPartNumber = this.part.PartNumber;
        this.selectedTraySize = this.part.TraySize;

        localStorage.setItem("selectedPart", this.part.PartId);   
    
    }

    // load 
 
    getAllPartTypes() {
        return this.partTypeDataService.parttypes
               .then(allPartTypes => this.allPartTypes = _.sortBy(allPartTypes, "Name"));   
    }

    
    getAllPartsByCustomerAndPartType(partTypeId) {
        return this.partDataService.getAllPartsByCustomerAndPartType(partTypeId)
             .then(allParts => this.allParts = _.sortBy(allParts, "PartNumber"));
    }
    
    setSelectedPart(partId){      
        this.part = _.findWhere(this.allParts, {PartId: partId});
        console.log(this.part);
        

    }
}