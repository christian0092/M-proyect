import { Component, OnInit,  ViewChild , ElementRef} from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUploadClientServiceService} from "../../services/file-upload-client-service.service"
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { trueCheck, maxFileSize,fileType } from '../../customValidators/customValidators';
import { checkSize, checkFileType } from '../../Decorators/fileUploadDecorator';
import {SnackBarServicesService} from '../../services/snack-bar-services.service'


@Component({
  selector: 'msummit',
  templateUrl: './m-summit.component.html',
  styleUrls: ['./m-summit.component.css']
})
export class MSummitComponent implements OnInit {

	formTemplate:FormGroup;
	public loading: boolean = false;
	file:File;
  file2:File
  errorInfo:string='Se produjo un error inesperado'
  success:boolean=false
	public noError:Boolean;
	public send:Boolean=false;
  errorType:string
  errorSize:string

 @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private fb: FormBuilder,
   private fileUploadService:FileUploadClientServiceService,
   private snack:SnackBarServicesService) {
   this.formTemplate=fb.group({
     title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      terms:['', Validators.compose([Validators.required, trueCheck])],
      template: fb.group({
        fileName: ['', Validators.compose([Validators.required,fileType(['pptx','ppt','doc','docx'])])],
        fileType: ['', Validators.compose([Validators.required])],
        fileSize: ['', Validators.compose([Validators.required, maxFileSize(1024*1024*15)])],
      })
    })}

  ngOnInit() {
    this.noError=true
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
     this.file = event.target.files[0];
     //this.file2=event.target.files[1];

    this.formTemplate.get('template').setValue({
          fileName: this.file.name,
          fileType: this.file.type,
          fileSize:this.file.size,
        })
      //console.log(this.file.name)
      //console.log(this.file2.name)
        //console.log(this.formTemplate);

    }else{
      //this.noError=false
      //this.errorInfo="Se produjo un error al cargar, vuelva a intentarlo.."
    }
    //console.log(this.formTemplate.controls['template'].get('fileSize').hasError('maxFileSize'))
  }
    
      clearFile() {
    this.formTemplate.reset()
    this.file=null;
    this.send=false;
    this.success=false
    this.noError=true;
    this.fileInput.nativeElement.value=""
  }


  onSubmit() {
    if(this.formTemplate.valid && this.file){
  	this.send=true;
    this.noError=true
    this.success=false
    this.snack.notificationChange(["info","Enviando"])
   //const formModel = this.formTemplate.value;
    this.loading = true;
       this.fileUploadService.addfile(
                this.file,
                this.formTemplate).subscribe(
                    event=>{
                      this.snack.notificationChange(["successful","Archivo enviado correctamente!"])
                      this.send=false
                      this.success=true
                      this.loading=false
                      this.noError=true
                      this.fileInput.nativeElement.value=""
                      this.formTemplate.reset()},
                    error=>{
                      this.snack.notificationChange(["error",error.message])
                       this.send=false
                      this.success=false
                      this.noError=false;
                      this.loading = false;
                      this.errorInfo=error.message
                        //console.log(error)
                    });}else if(this.formTemplate.invalid && this.file==null){
                    this.success=true
                    this.loading=false
                    this.noError=false
                     this.snack.notificationChange(["warning","Se produjo un error, compruebe que esta logueado y los campos estan completos"])
                    this.errorInfo="Se produjo un error, compruebe que esta logueado y los campos estan completos"
                }

  }
  	getNoError(){
  	return this.noError;
  }
  getSend(){
  	return this.send;}
checkSize(){
     let { error: error, errorInfo: errorInfo } = checkSize('template','fileSize',this.formTemplate)
     if(error){
       this.errorSize=errorInfo
     }
     return error
        }
     checkType(){
       let { error: error, errorInfo: errorInfo } = checkFileType('template','fileName',this.formTemplate)
     if(error){
       this.errorType=errorInfo
     }
     //console.log('error de formato'+error)
     //console.log('Info de error'+errorInfo)
     return error
        }
}


     /* handleProgress(event){
    if (event.type === HttpEventType.DownloadProgress) {
        this.loading =true
        //this.uploadProgress = Math.round(100 * event.loaded / event.total)
      }

      if (event.type === HttpEventType.UploadProgress) {
        this.loading =true
        //this.uploadProgress = Math.round(100 * event.loaded / event.total)
      }

      if (event.type === HttpEventType.Response) {
        // console.log(event.body);
        this.loading = true
        //this.serverResponse = event.body
      }
    }*/



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
//}
