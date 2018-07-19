import { AbstractControl, FormGroup, FormControl, Validator} from '@angular/forms';

export function passwordConfirming(c: AbstractControl): any {
        if(!c.parent || !c) return;
        const pwd = c.parent.get('password');
        const cpwd= c.parent.get('password_confirmation')

        if(!pwd || !cpwd) return ;
        if (pwd.value !== cpwd.value) {
            return { invalid: true };

    }}
 export function passwordMatchValidator(g: FormGroup) {
  return g.get('password').value === g.get('passwordConfirm').value
    ? null : { 'mismatch': true };
}
export function validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  export function trueCheck(c: AbstractControl){
     if(!c.parent || !c) return;
        const check = c.parent.get('terms');
        if(!check) return ;
        if (check.value !== true) {
            return { invalid: true };

    }}
    export function maxFileSize(max:number){
       return function(c: FormControl) { 
        //console.log(c.value)
        //console.log(max)
         return c.value<max ? null : { maxFileSize: true };}
       }
 export function fileType (type:string[]){
       return function(c: FormControl) {        
        
        var valid=false  
        //console.log('valor enviado:'+c.value)
        if(c.value!=null){ 
        var ext = c.value.substring(c.value.lastIndexOf('.') + 1);      
        for (var i = type.length - 1; i >= 0; i--) {
           //console.log('Extension requerida:'+type[i])        
           if(ext.toLowerCase()==type[i]){ 
             //console.log('Extension leida:'+ext)
             valid=true}
        }}
         return (valid) ? null : { checkFileType: true };}
       }



