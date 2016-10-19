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

            var token = localStorage.getItem('aurelia_authentication');
            let base64Url = token.split('.')[1];
            let base64    =  base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
            this.currentUser = JSON.parse(decodeURIComponent(escape(window.atob(base64))));           
            
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