import { Component, OnInit,  ViewChild , ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUploadClientServiceService} from "../services/file-upload-client-service.service"

 export function onFileChange(event, file:File,form:FormGroup) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
     file = event.target.files[0];
     form.get('fileData').setValue({
          fileName: file.name,
          fileType: file.type,
          fileSize:file.size,
        })
     
  }
  return {file:file,form:form}
}
export function checkSize(controls:string, get:string, form:FormGroup){
      var error:boolean=false
      var errorInfo:string=null
      if(form.controls[controls].get(get).invalid)
        {
      if(form.controls[controls].get(get).errors.maxFileSize)
        {error=true
          errorInfo='El archivo es muy grande!'}}
          let obj={error:error,errorInfo:errorInfo}
          return obj
    }
 export function checkFileType(controls:string, get:string, form:FormGroup){
      var error:boolean=false
      var errorInfo:string=null
      if(form.controls[controls].get(get).invalid)
       {  if(form.controls[controls].get(get).errors.required){

       }else{
         error=true
          errorInfo='El formato del archivo es incorrecto!'}
        }
          let obj={error:error,errorInfo:errorInfo}
          return obj
    }