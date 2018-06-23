import { Component, OnInit } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';

@Component({
  selector: 'msummit',
  templateUrl: './m-summit.component.html',
  styleUrls: ['./m-summit.component.css']
})
export class MSummitComponent implements OnInit {

  constructor(private http: Http,) { }

  ngOnInit() {
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
