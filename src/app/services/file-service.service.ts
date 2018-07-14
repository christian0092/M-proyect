
import { Injectable } from '@angular/core';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { InterceptorService } from 'ng2-interceptors';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';


//import { ConfigService } from 'app/common/services/config.service';
import { getFileNameFromResponseContentDisposition, saveFile } from '../perfil/m-summit/file-download-helper';

@Injectable()
export class FileServiceService {
    constructor(
       // private config: ConfigService,
        private http: Http,
    ) {}

    downloadFile(/*propertyId: string, fileId: string*/) {
        const url = 'http://services.mwork.com.ar/storage/app/public/summit/summit_movilidad_futura.pptx';
        const options = new RequestOptions({responseType: ResponseContentType.Blob });

        // Process the file downloaded
        this.http.get(environment.apiUrl + 'summit/summit_movilidad_futura.pptx', options).subscribe(res => {
            const fileName = getFileNameFromResponseContentDisposition(res);
            saveFile(res.blob(), fileName);
        });
    }
    
