import { Injectable } from '@angular/core';
import { SessionBean } from '../bean/sessionbean';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class EksiSharedService {

  sessionbean: SessionBean = new SessionBean();

  constructor() {
    console.log('shared service constructed..');
  }

  getTopicsTypeDescription() {
    if (this.sessionbean.topicsType) {
      if (this.sessionbean.topicsType === 'today') {
        return "bugün";
      } else if (this.sessionbean.topicsType == 'popular') {
        return "gündem";
      }
    }
  }
}