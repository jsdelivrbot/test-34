import * as log from 'toastr';

export class Session { 


    constructor(user){
        this.currentUser = user;
    }
     
    /*
     this will grab the token from local storage and return the currently authenticated user
    */
    getCurrentUser(token){        

        try {

            let base64Url = token.split('.')[1];
               
            // decode the base64 string into a JSON object.
            this.currentUser = JSON.parse(window.atob(base64Url)); 
            
            //this.currentUser.image = localStorage.getItem("profile-photo");
            this.currentUser.userName = this.currentUser.unique_name;           
            this.currentUser.displayName = this.currentUser.firstName + " " + this.currentUser.lastName;

        } catch (error) {
            console.log(error);
            log.error('Unauthorized (no token)' + error);
        }  

        return this.currentUser;

    }
}