import { Injectable } from '@angular/core';
import { Headers, Http, Response, } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';


@Injectable()
export class FileUploadClientServiceService {
  private header = new Headers();
  constructor(private http: Http) { }

  addfile(fileItem: File, form: FormGroup): Observable<object> {
    const header = new Headers(
      {
        'Accept': 'application/json',
        'Authorization': 'Bearer' + localStorage.getItem('token')
      });
    const formData: FormData = new FormData();
    formData.append('template', fileItem, fileItem.name)
    formData.append('title', form.get('title').value)
    formData.append('description', form.get('description').value);
    return this.http.post(
      environment.apiUrl + 'summitUploadTemplete', formData, { headers: header }
    ).map((response: Response) => response.json())
      .catch((Error: any) => Observable.throw(Error.json()))
  }
  
  changeAvatar(fileItem: File, form: FormGroup): Observable<object> {
    const header = new Headers(
      {
        'Accept': 'application/json',
        'Authorization': 'Bearer' + localStorage.getItem('token')
      });
    const formData: FormData = new FormData();
    formData.append('avatar', fileItem, fileItem.name)
    return this.http.post(
      environment.apiUrl + 'changeAvatar', formData, { headers: header }
    ).map((response: Response) => response.json())
      .catch((Error: any) => Observable.throw(Error.json()))
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
