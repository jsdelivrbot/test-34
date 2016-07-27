import {AuthService} from 'aurelia-authentication';
import {inject} from 'aurelia-framework';
import {ManageUserService} from 'services/dataservices/manage-user-service';
import {Router} from 'aurelia-router';
import {Session} from 'services/session';
import * as log from 'toastr';
import $ from 'jquery';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(AuthService, ManageUserService, Router, Session, EventAggregator)
export class Profile {

    heading = 'Profile';
    profileImage = null;
    selectedFiles = [];

    pendingUpdate = false;
    updated = true;

    constructor(auth, manage, router, session, eventAggregator) {
        this.auth = auth;
        this.manage = manage;
        this.router = router;   
        this.session = session;
        this.ea = eventAggregator;
       
    };

    activate(){
       
        var token = localStorage.getItem('aurelia_authentication');
        this.currentUser = this.session.getCurrentUser(token);     
              
        // set the profile image
        this.profileImage = 'data:image/jpeg;base64,' +  this.currentUser.image;

        this.currentUser.displayName = this.currentUser.firstName + " " + this.currentUser.lastName;
        
    }

    cancelFile(){
        this.selectedFiles = [];
        this.pendingUpdate = false;
        this.selectFile = null;
        this.file = null;
        $("input.file-input").val("");
    }

   
    showFileUpload(){
        $("input.file-input").click();      
    }


    verifyFile($event){
        
        this.pendingUpdate = true;
        let profileImage = this.selectedFiles[0];
        
        if(profileImage){

            console.log("name : " + profileImage.name);
            console.log("size : " + profileImage.size);
            console.log("type : " + profileImage.type);
            console.log("date : " + profileImage.lastModified);

            if(profileImage.size > 2097152){
                log.error('sorry, file to large. Please upload < 2MB in size!');
                this.selectedFiles = [];
            }
        }
               
        let reader = new FileReader();
        let file = $event.target.files[0];
        reader.readAsDataURL(file);
        this.fileName = file.name;

        reader.onload = () => {

            this.file = reader.result;
            this.selectFile = {
                fileName: this.fileName,
                fileAsString: this.file,
                userId: this.currentUser.Id
            };
          
            console.log(this.selectFile);
        };

    }

    updateUserImage(){
        this.manage.updateUserProfileImage(this.selectFile).then(()=> {
            this.pendingUpdate = false;
            localStorage.setItem("profile-photo", 
                this.selectFile.fileAsString.replace(/data:image\/[A-Z,a-z]{3,};base64,/,""));


            this.ea.publish('profileUpdated', {message: 'pic updated'});
            
        });
    } 

    updateUser(){
        
        return this.manage.updateUser(this.currentUser)
            .then(() =>{

                this.pendingUpdate = false;
                this.updated = true;

                this.currentUser.displayName = this.currentUser.firstName + " " + this.currentUser.lastName;
            
            }).then(() => {
                if(this.selectFile){                    
                    this.updateUserImage();
                }
            }).then(() => this.manage.refresh());
    }
}