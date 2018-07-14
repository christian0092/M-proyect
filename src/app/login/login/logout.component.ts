import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {Profile} from '../../models/profile'
import { Observable,Subject } from 'rxjs';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  user:String="Mi usuario";

  myProfile:Profile;
  myProfile$: Observable<Profile>;
  isLogged$:Observable<boolean>


  constructor(
    private loginService:LoginService, private userService:UserService
  ) {
    
    //this.userService.getMyProfile().subscribe(profile=>this.user=profile.name)
    //this.userService.checkMyProfile();
    this.loginService.isLogin$().subscribe(
      isLogged => {
        if(isLogged==true)
        {
          this.myProfile$ = this.userService.getMyProfile2();
          this.userService.getMyProfile2().subscribe(
              profile => {

                this.myProfile = profile;
                  console.log(this.myProfile)
                if(this.myProfile.person!=null){

                  this.user=this.myProfile.person.name+' '+this.myProfile.person.surname;
                   console.log(this.user)

                }
                else if(this.myProfile.organization!=null){
                   console.log(this.myProfile)
                 this.user=this.myProfile.organization.name;
                }
               // this.user="hola"
                //this.userService.checkMyProfile();
          });

        }
      });



   }

  ngOnInit() {

  }
  logout(){
    this.loginService.logout();
  }
}
function replacer(key, value) {
  //console.log(typeof value);
  if (key === 'email') {
    return undefined;
  }
  return value;
}
