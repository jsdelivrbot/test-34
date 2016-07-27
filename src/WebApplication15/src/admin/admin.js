import {inject} from 'aurelia-framework';
import {UserDataService} from 'services/dataservices/user-service';
import {Session} from 'services/session';

@inject(UserDataService)
export class Admin{

    heading = 'L3';
    users = [];

    constructor(userDataService) {               
        this.userDataService = userDataService;
    }  
   
    activate() {    
        this.currentUser = Session.currentUser;  
        
        return Promise.all([
         this.getAllUsers()           
        ]);    
    }
    getAllUsers(){
        this.userDataService.getAllUsers()
                .then((users)=> 
                {
                    this.users = users;
                });
    }
}