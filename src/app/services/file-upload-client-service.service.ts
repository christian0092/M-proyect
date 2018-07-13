import { Injectable } from '@angular/core';
import { Headers, Http, Response,  } from '@angular/http';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from  'rxjs/observable/of';
import { catchError, map, tap } from  'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, NG_ASYNC_VALIDATORS } from '@angular/forms';


@Injectable()
export class FileUploadClientServiceService {
 private header = new Headers();
apiBaseURL = 'http://127.0.0.1:8000/api/'


    constructor(private http: Http){ }


    addfile(fileItem:File, form:FormGroup): Observable<object> {
      const header = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer' + localStorage.getItem('token')});
      const formData: FormData = new FormData();
      formData.append( 'tittle',form.get('tittle').value)
      formData.append( 'descriptionArea',form.get('descriptionArea').value)
      formData.append( 'fileName',form.get('template.fileName').value)
      formData.append( 'fileType',form.get('template.fileType').value)
      formData.append( 'fileSyze',form.get('template.fileSyze').value)
      formData.append('file', fileItem, fileItem.name)
      return this.http.post(
        environment.apiUrl + 'login', formData, { headers: this.header }
      ).map((response: Response) => response.json())
      .catch((Error:any)=>Observable.throw(Error.json()))
    }

    /* fileUpload(fileItem:File, extraData?:object):any{
      let apiCreateEndpoint = `${this.apiBaseURL}files/create/`
      const formData: FormData = new FormData();

      formData.append('fileItem', fileItem, fileItem.name);
      if (extraData) {
        for(let key in extraData){
            // iterate and set other form data
          formData.append(key, extraData[key])
        }
      }

      const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
        reportProgress: true // for progress data
      });
      return this.http.request(req)
    }

  optionalFileUpload(fileItem?:File, extraData?:object):any{
      let apiCreateEndpoint = `${this.apiBaseURL}files/create/`
      const formData: FormData = new FormData(); //?
       let fileName;
      if (extraData) {
        for(let key in extraData){
            // iterate and set other form data
            if (key == 'fileName'){
              fileName = extraData[key]
            }
          formData.append(key, extraData[key])
        }
      }

      if (fileItem){
        if (!fileName){
           fileName = fileItem.name
        }
        formData.append('image', fileItem, fileName);
      }
      const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
        reportProgress: true // for progress data
      });
      return this.http.request(req)
  }
    list(): Observable<any>{
      const listEndpoint = `${this.apiBaseURL}files/`
      return this.http.get(listEndpoint)
    }*/

}
