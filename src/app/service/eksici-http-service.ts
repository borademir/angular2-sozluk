import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { Channel }                 from '../model/channel';
import { TopicPager} from '../model/topicpager';
import { Topic } from '../model/topic';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class EksiciService {
  private apiBaseUrl = 'http://localhost:9080/api/v1/';  // URL to web API
  
  constructor (private http: Http) {}

  getChannels (): Observable<Channel[]> {
    console.log('get channels baslar');
    let resp: Observable<Channel[]> = this.http.get(this.apiBaseUrl + 'channels')
                   // .map(this.extractData)
                    .map((response: Response) => <Channel[]>response.json())
                    .catch(this.handleError);
    console.log('get channels biter');
    return resp;
  }


  getTopics (pTopicType: String): Observable<TopicPager> {
    console.log('get topics baslar');
    let resp: Observable<TopicPager> = this.http.get(this.apiBaseUrl + pTopicType)
                    .map((response: Response) => <TopicPager>response.json())
                    .catch(this.handleError);
    console.log('get topics biter');
    return resp;
  }

  getTopicEntries (pHref: String): Observable<Topic> {
    console.log('get topic entries baslar');
    let resp: Observable<Topic> = this.http.get(this.apiBaseUrl + 'topics/entries?topicsHref=' + pHref)
                    .map((response: Response) => <Topic>response.json())
                    .catch(this.handleError);
    console.log('get topic entries biter');
    return resp;
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body.data ;
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