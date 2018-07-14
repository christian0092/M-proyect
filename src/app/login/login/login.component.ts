import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../login/user.model';
import {UserService} from '../../services/user.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, NG_ASYNC_VALIDATORS, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  /*changeDetection: ChangeDetectionStrategy.OnPush*/
})
export class LoginComponent implements OnInit {
logForm:FormGroup
 userInvalid:boolean=false
 passwordInvalid:boolean=false
 error:boolean=false
 errorInfo:string='Se produjo un error inesperado'
 send:boolean=false
  constructor(
    private loginService:LoginService,
    private userService:UserService,
     private fp: FormBuilder

  ) { }

  ngOnInit() {
    this.createForm()
  }

  login(){
     this.userInvalid=this.logForm.get('username').invalid
    this.passwordInvalid=this.logForm.get('password').invalid
    this.error=false
    this.send=false
    if(this.logForm.valid){
      this.send=true
    let user = <User>this.logForm.value

    this.loginService.login(user).subscribe(
      data => {
         this.send=false
        this.error=false
        this.loginService.setLogin(data);
        //this.addProfile();

      },
      error =>  {
        console.log(error)
         this.send=false
        this.error=true
        this.errorInfo=error.message
        this.logForm.get('password').patchValue('')
      });
  }
}
clearAll(){
 this.logForm.reset()
 this.send=false
 this.error=false
 this.userInvalid=false
 this.passwordInvalid=false
}
createForm() {
    this.logForm = this.fp.group({
      username:[null, Validators.compose([Validators.required, Validators.email])],
        password: [null, Validators.compose([Validators.required,/* Validators.minLength(6), */Validators.maxLength(20)])]})

  }
  /*addProfile(){
    this.userService.getMyProfile2().subscribe(profile => {
<<<<<<< HEAD
          this.userService.checkMyProfile();
=======
          console.log(profile['data']);
          this.userService.checkMyProfile()

>>>>>>> 566baed65c39f52555d090092ebaf0fda6871c2d
    });
  }*/
}
