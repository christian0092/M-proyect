import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Interests } from '../../models/interests';
import { environment } from '../../../environments/environment';

@Injectable()
export class RegisterService {
    listaIntereses : Interests[]

    private header = new Headers();

    constructor(private http: Http) {
     }

    getInterests(): Observable<object> {
      this.header.append('Content-Type', 'application/json');
      return this.http.get(
        environment.apiUrl + 'interests', { headers: this.header }
      ).map((response: Response) => response.json());
    }

    addUser(data): Observable<object> {
      this.header.append('Content-Type', 'application/json');
      this.header.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA3NzVmMTlhNzUwOWFiZTUwYmU0ZWJlYmZmODJkNTllZDQ4M2Q3YmI0Y2MyNTZlZmVlOTc4MTQ4Y2ZiNGRjMTU3NTk2YmI0MDVkMjgxNzkyIn0.eyJhdWQiOiIxIiwianRpIjoiMDc3NWYxOWE3NTA5YWJlNTBiZTRlYmViZmY4MmQ1OWVkNDgzZDdiYjRjYzI1NmVmZWU5NzgxNDhjZmI0ZGMxNTc1OTZiYjQwNWQyODE3OTIiLCJpYXQiOjE1Mjk0MzQ5NDksIm5iZiI6MTUyOTQzNDk0OSwiZXhwIjoxNTYwOTcwOTQ5LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.YxF1N-EEY-xNkrMDRi6lsOFvN37zIjjzwO_YqY66dqhjSa5AMF-TyaRGV_lI1gySar2RgrUgetgj9ZF-SfQsEjFWy_D1LKpnauMp4uvib7t36I4cPRucuu7Gt_viKWenkfZNwxUjvBT-1AhdhTCGytU5b8mBIeRX3kwI8q-I3IVWd9M0bWx0DiHv1jIvjuZEZWwS8eIS_5Swo6VFxvids6RyJBEsb__2f531rVg_Bp-gXGoEMovEcn--NlezwlCWsxT26lL2Bjz-3r9i8fwJytM2RBfrXb5zyNnfD0EN9FyLKk4sYQYx86x4CKPuzGNLdhbzQekK2CuZ0SjOKd-Qi6xXd1yii830VSRsRyPlCWMzp2rPk6SYQG1ZNMmYIYIwNw0fBpsB63kqmy7ns6Lk89CQAXtbOihWzOxfqG348K_vGyf_PVvG5DRC-BL9qhn0plceUNsh9ReUEIWsz-zooA8cOeAU6-z7gSlYsttlxBIT-wtGTOFoT3J5y16zIkZJ7AXuq-XWfhJkC412TGGGic1DESuJ4Hf77_5-I1PtKUB2sQfzHOPUpZ6wUA9Owidvl3S0TY8ymY1Xxhpstyr1VH3ykxkhfCbgyL7teDdEmJfe0Jnja8KuFabIChS2LG7nLGBwuBb_QHPanttedPdEGTF-QuZNdBEGHu47jWCIsT4');

      return this.http.post(
        environment.apiUrl + 'user', data, { headers: this.header }
      ).map((response: Response) => response.json());
    }

}
