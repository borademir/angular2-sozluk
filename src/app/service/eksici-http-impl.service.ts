import { Injectable }                 from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import { Observable}                  from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EksiciHttpImplService extends Http{
  
  constructor (backend: XHRBackend, options: RequestOptions) {
    let token = localStorage.getItem('sozlukToken'); // your custom token getter function here
    console.log("EksiciHttpImplService.constructor:" + token);
    //options.headers.set('sozlukToken', token);
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = localStorage.getItem('sozlukToken');
    console.log("EksiciHttpImplService.request:" + token + ",url:" + url);
    
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      options.headers.append('Authorization', token);
    } else {
    // we have to add the token to the url object
      url.headers.append('Authorization', token);

    }
    

    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: EksiciHttpImplService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}