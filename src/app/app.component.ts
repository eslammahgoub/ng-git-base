import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { RepoItem, RepoSearchResponse, RepoParam, Sort, Order } from '@shared/models';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RepositoryService } from '@core/services';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'gitbase-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  // unSub is subject used for free the memory from observable objects
  unSub: Subject<any> = new Subject<any>();

  // current repositories items
  items: RepoItem[] = [];

  // current repos counts
  reposCount: number = 0;

  // current options
  options: RepoParam = {} as RepoParam;

  // @Note: this form control used for prevent multiple clicks issues
  pageChange: FormControl = new FormControl();

  constructor(
    private repoServ: RepositoryService,
    private snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  // on init the component
  ngOnInit(): void {
    // init the options
    this.initOptions();

    // Get initial items on start
    this.getItems();

    // watch page changes
    this.pageChangesOB();
  }

  /**
   * pageChangesOB
   * @function
   * @description watch page changes values
   * void
   */
  pageChangesOB(): void {
    this.pageChange.valueChanges.pipe(
      takeUntil(this.unSub),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((res) => this.changePage(res));
  }

  /**
   * initOptions
   * @function
   * @description init the options params for get the repos
   */
  initOptions(): void {
    this.options =  {
      q: 'created:>2017-10-22',
      sort: Sort.stars,
      order: Order.desc,
      page: 1,
      per_page: 100,
    };
  }


  /**
   * getItems
   * @function
   * @description get items form repo services
   * void
   */
  getItems(): void {
    this.repoServ.getAllRepositories(this.options).pipe(
      takeUntil(this.unSub),
    ).subscribe((res) => this.successFn(res), (error) => this.errorFn(error));
  }

  /**
   * successFn
   * @function
   * @description stream Function for subscribe for get all the repo
   * @param res {RepoSearchResponse} current response
   * void
   */
  successFn(res: RepoSearchResponse): void {
    if (res) {
      this.items = this.items.concat(...res.items);
      this.reposCount = res.total_count;
      this.changeDetector.detectChanges();
    }
  }

  /**
   * errorFn
   * @function
   * @description error handler Function
   * @param error {any} error Obj
   * void
   */
  errorFn(error: any): void {
  // @TODO: create an error handle
  if (error && error.error && error.error.message)
    this.snackBar.open(error.error.message, 'close', {
      duration: 2000,
    });
  }

  /**
   * changePage
   * @function
   * @description change the current page index && get items
   * @param page {number}
   * void
   */
   changePage(page: number): void {
    this.options.page = page;
    this.getItems();
  }


  //on component destroy
  ngOnDestroy(): void {
    if (this.unSub) {
      this.unSub.next(null);
      this.unSub.complete();
    }
  }
}
