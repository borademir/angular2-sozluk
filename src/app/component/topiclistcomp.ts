import { Component, OnInit }       from '@angular/core';
import { Todo }                    from '../model/todo';
import { EksiciService }           from '../service/eksici-http-service';
import { EksiSharedService }       from '../service/eksi-shared.service';
import { Channel }                 from '../model/channel';
import { TypeaheadMatch }          from 'ngx-bootstrap/typeahead';
import { Observable }              from 'rxjs/Observable';
import { AutoComplete }            from '../model/autocomplete';
import { Topic }                   from '../model/topic';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-topiclist',
  templateUrl: '../view/topiclist.html',
  providers: [EksiciService]
})
export class TopicListComponent {

  public asyncSelected: string;
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;
  public dataSource: Observable<Topic[]>;
  errorMessage: String;

  constructor(
    private eksiciService: EksiciService,
    private eksiciSharedService : EksiSharedService) {
          this.dataSource = Observable
            .create((observer: any) => {
            // Runs on every search
             observer.next(this.asyncSelected);
    })
    .mergeMap((token: string) => this.eksiciService.autocomplete(token));
  }


  ngOnInit(): void {
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
 
  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }
 
  public typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
  }

}
