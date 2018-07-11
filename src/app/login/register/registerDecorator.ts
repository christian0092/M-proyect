import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { passwordConfirming, passwordMatchValidator, validateAllFormFields} from '../../customValidators/customValidators';
import { LoginService } from '../../services/login.service';

/*export function isFieldValidation(field: string,form:FormGroup) {
    return (!form.get(field).valid && form.get(field).touched) ||
      (form.get(field).untouched && this.formSubmitAttempt);
  }*/
  export function onSubmitAbstract(form:FormGroup, loginServices: LoginService, formSubmitAttempt:boolean, send:boolean, error:boolean,isLogged:boolean) {
   	formSubmitAttempt = true;
    if (form.valid) {
      send = true;
      error = false;
      if(!isLogged){//registra si no esta logueado
      loginServices.register(form.value).subscribe(
        data => {
          if (data['success']) {
            let obj={form:form,formSubmitAttempt:formSubmitAttempt}=resetAbstract(form,formSubmitAttempt);
            send = true;
            error = false;
            //alert('Usuario creado correctamente');
          } else {
            alert(data['message']);
            }
          });
      }else if(isLogged){
        console.log("modificando usuario");
      }
    }
    else {
      this.error = true;
      validateAllFormFields(form);
    }
    let obj={loginServices:loginServices,formSubmitAttempt:formSubmitAttempt,send:send,error:error,isLogged:isLogged}
    return obj
  }
  export function resetAbstract(form:FormGroup, formSubmitAttempt) {
    form.reset();
    formSubmitAttempt = false;
    let obj={form:form,formSubmitAttempt:formSubmitAttempt}
    return obj
  }
