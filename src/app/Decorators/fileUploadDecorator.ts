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
export function checkSize(controls:string, get:string, form:FormGroup):boolean{
      if(form.controls[controls].get(get).valid) {return false}
      if(form.controls[controls].get(get).errors.maxFileSize){return true} 
    }