import { Component, OnInit }       from '@angular/core';
import { Todo }                    from '../model/todo';
import { EksiciService }           from '../service/eksici-http-service';
import { EksiSharedService }       from '../service/eksi-shared.service';
import { Channel }                 from '../model/channel';
import { TypeaheadMatch }          from 'ngx-bootstrap/typeahead';
import { Observable }              from 'rxjs/Observable';
import { AutoComplete }            from '../model/autocomplete';
import { Topic }                   from '../model/topic';
import { Router, ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router,
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
    this.router.navigate([this.eksiciSharedService.getEntryRouterLink(e.item.href)]);
    this.asyncSelected = '';
    console.log('Selected value: ', e.item.topicText);
  }

  refresh(event) {
     console.log('sacma sapan click');
     location.reload();
  }
  
}
