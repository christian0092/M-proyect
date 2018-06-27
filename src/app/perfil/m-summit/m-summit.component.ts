import { Component, OnInit,  ViewChild , ElementRef} from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'msummit',
  templateUrl: './m-summit.component.html',
  styleUrls: ['./m-summit.component.css']
})
export class MSummitComponent implements OnInit {
	
	formTemplate:FormGroup;
	public loading: boolean = false;
	file:File;
	public noError:Boolean;
	public send:Boolean=false;

 @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private fb: FormBuilder) {
   this.formTemplate=fb.group({
  		template:['',Validators.compose([Validators.required])]})}

  ngOnInit() {
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
     this.file = event.target.files[0];
     }
    this.formTemplate.get('template').setValue({
          filename: this.file.name,
          filetype: this.file.type,
          filesyze:this.file.size,
          value: this.file
        })  
        console.log(this.formTemplate);  
    }
      
 
  onSubmit() {
  	this.send=true;
   const formModel = this.formTemplate.value;
    this.loading = true;
    setTimeout(() => {
      console.log(formModel);
      this.noError=true;
      this.loading = false;
    }, 1000);
   
  }
  	getNoError(){
  	return this.noError;
  }
  getSend(){
  	return this.send;}

  		

  clearFile() {
    this.formTemplate.get('template').setValue(null);
    this.file=null;
    this.send=false;
    this.noError=false;
  }
}

  /*downloadFile() {
  return this.http
    .get('https://jslim.net/path/to/file/download', {
      responseType: ResponseContentType.Blob,
      search: // query string if have
    })
    .map(res => {
      return {
        filename: 'filename.pdf',
        data: res.blob()
      };
    })
    .subscribe(res => {
        console.log('start download:',res);
        var url = window.URL.createObjectURL(res.data);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = res.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      }, error => {
        console.log('download error:', JSON.stringify(error));
      }, () => {
        console.log('Completed file download.')
      });*
}*/
}
