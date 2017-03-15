import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class EksiciService {
  private apiBaseUrl = 'http://localhost:9080/api/v1/';  // URL to web API
  
  constructor (private http: Http) {}

  getChannels (): Observable<Object[]> {
    console.log('get channels baslar');
    let resp: Observable<Object[]> = this.http.get(this.apiBaseUrl + 'channels')
                    .map(this.extractData)
                    .catch(this.handleError);
    console.log('get channels biter');
    return resp;
  }
  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body.data || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}