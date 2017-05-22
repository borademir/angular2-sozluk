import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { Channel }                 from '../model/channel';
import { TopicPager}               from '../model/topicpager';
import { Topic }                   from '../model/topic';
import { Suser }                   from '../model/suser';
import { AutoComplete }            from '../model/autocomplete';
import { environment }             from '../../environments/environment';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class EksiciService {
  
  constructor (private http: Http) {}

  getChannels (): Observable<Channel[]> {
    let resp: Observable<Channel[]> = this.http.get(environment.apiBaseUrl + 'channels')
                   // .map(this.extractData)
                    .map((response: Response) => <Channel[]>response.json())
                    .catch(this.handleError);
    return resp;
  }

  autocomplete (pQueryString: String): Observable<Topic[]> {
    let resp: Observable<Topic[]> = this.http.get(environment.apiBaseUrl + 'autocomplete?query=' + pQueryString)
                    .map((response: Response) => response.json().topicList as Topic[])
                    .catch(this.handleError);
    return resp;
  }

  getTopics (pTopicType: String): Observable<TopicPager> {
    let resp: Observable<TopicPager> = this.http.get(environment.apiBaseUrl + pTopicType)
                    .map((response: Response) => <TopicPager>response.json())
                    .catch(this.handleError);
    return resp;
  }

  getSuserEntryStats (pSuserNick: String , pEntryStatType: String): Observable<TopicPager> {
    let resp: Observable<TopicPager> = this.http.get(environment.apiBaseUrl + 'suser/' + pSuserNick + '/stats/entry/' + pEntryStatType)
                    .map((response: Response) => <TopicPager>response.json())
                    .catch(this.handleError);
    return resp;
  }

  getTopicEntries (pHref: String): Observable<Topic> {
    let resp: Observable<Topic> = this.http.get(environment.apiBaseUrl + 'topic/entries?topicsHref=' + pHref) // paging template gecisi
                    .map((response: Response) => <Topic>response.json())
                    .catch(this.handleError);
    return resp;
  }

  getEntry (pEntryId: String): Observable<Topic> {
    let resp: Observable<Topic> = this.http.get(environment.apiBaseUrl + 'entry/' + pEntryId)
                    .map((response: Response) => <Topic>response.json())
                    .catch(this.handleError);    
    return resp;
  }

  getSuser (pSuserNick: String): Observable<Suser> {
    let resp: Observable<Suser> = this.http.get(environment.apiBaseUrl + 'suser/' + pSuserNick)
                    .map((response: Response) => <Suser>response.json())
                    .catch(this.handleError);
    return resp;
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body.data ;
  }
  private handleError (error: Response | any) {
    
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error('HTTP Service : ' + errMsg);
    return Observable.throw(errMsg);
  }
}