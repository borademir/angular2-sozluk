import { Injectable } from '@angular/core';
import { SessionBean } from '../bean/sessionbean';
import { Subject }    from 'rxjs/Subject';
import { EksiciService } from '../service/eksici-http-service';

@Injectable()
export class EksiSharedService {

  sessionbean: SessionBean = new SessionBean();

  constructor(
    private eksiciService: EksiciService,
  ) {
    console.log('shared service constructed..');
  }

  loadTopicsAsync(ptopicsType: String, pTopicsTypeDescription: String) {
    console.log('loading topics');
    this.eksiciService.getTopics(ptopicsType).subscribe(
      data => this.sessionbean.topicsCurrentPage = data,
      error => this.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed " + this.sessionbean.topicsCurrentPage.contentList + " topics loaded..");
        this.sessionbean.topicsTypeDescription = pTopicsTypeDescription;
      }

    );
  }
}