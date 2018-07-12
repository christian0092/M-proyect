import { Injectable } from '@angular/core';
import { Headers, Http, Response,  } from '@angular/http';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from  'rxjs/observable/of';
import { catchError, map, tap } from  'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()
export class FileUploadClientServiceService {
 private header = new Headers();
apiBaseURL = 'http://127.0.0.1:8000/api/'


    constructor(private http: Http){ }


    addfile(fileItem:File, extraData?:object): Observable<object> {
      this.header.append('Content-Type', 'application/json');
      this.header.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA3NzVmMTlhNzUwOWFiZTUwYmU0ZWJlYmZmODJkNTllZDQ4M2Q3YmI0Y2MyNTZlZmVlOTc4MTQ4Y2ZiNGRjMTU3NTk2YmI0MDVkMjgxNzkyIn0.eyJhdWQiOiIxIiwianRpIjoiMDc3NWYxOWE3NTA5YWJlNTBiZTRlYmViZmY4MmQ1OWVkNDgzZDdiYjRjYzI1NmVmZWU5NzgxNDhjZmI0ZGMxNTc1OTZiYjQwNWQyODE3OTIiLCJpYXQiOjE1Mjk0MzQ5NDksIm5iZiI6MTUyOTQzNDk0OSwiZXhwIjoxNTYwOTcwOTQ5LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.YxF1N-EEY-xNkrMDRi6lsOFvN37zIjjzwO_YqY66dqhjSa5AMF-TyaRGV_lI1gySar2RgrUgetgj9ZF-SfQsEjFWy_D1LKpnauMp4uvib7t36I4cPRucuu7Gt_viKWenkfZNwxUjvBT-1AhdhTCGytU5b8mBIeRX3kwI8q-I3IVWd9M0bWx0DiHv1jIvjuZEZWwS8eIS_5Swo6VFxvids6RyJBEsb__2f531rVg_Bp-gXGoEMovEcn--NlezwlCWsxT26lL2Bjz-3r9i8fwJytM2RBfrXb5zyNnfD0EN9FyLKk4sYQYx86x4CKPuzGNLdhbzQekK2CuZ0SjOKd-Qi6xXd1yii830VSRsRyPlCWMzp2rPk6SYQG1ZNMmYIYIwNw0fBpsB63kqmy7ns6Lk89CQAXtbOihWzOxfqG348K_vGyf_PVvG5DRC-BL9qhn0plceUNsh9ReUEIWsz-zooA8cOeAU6-z7gSlYsttlxBIT-wtGTOFoT3J5y16zIkZJ7AXuq-XWfhJkC412TGGGic1DESuJ4Hf77_5-I1PtKUB2sQfzHOPUpZ6wUA9Owidvl3S0TY8ymY1Xxhpstyr1VH3ykxkhfCbgyL7teDdEmJfe0Jnja8KuFabIChS2LG7nLGBwuBb_QHPanttedPdEGTF-QuZNdBEGHu47jWCIsT4');
      const formData: FormData = new FormData();

      formData.append('fileItem', fileItem, fileItem.name);
      if (extraData) {
        for(let key in extraData){
            // iterate and set other form data
          formData.append(key, extraData[key])
        }
      }
      return this.http.post(
        environment.apiUrl + 'files', formData, { headers: this.header }
      ).map((response: Response) => response.json());
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
