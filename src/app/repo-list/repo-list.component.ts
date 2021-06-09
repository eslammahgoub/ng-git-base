import { takeUntil } from 'rxjs/operators';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { Component, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { RepoItem } from '@shared/models';
import { MatList } from '@angular/material/list';
import { Subject } from 'rxjs';

@Component({
  selector: 'gitbase-repo-list',
  templateUrl: './repo-list.component.html',
})
export class RepoListComponent implements OnDestroy {
  // repo List element
  @ViewChild('repoList', {static: false}) repoListElement: MatList | any;

  // the repositories items of current page
  @Input() repos: RepoItem[] = [];

  // count of the all repositories
  @Input() reposCount: number = 0;

  // page size
  @Input() pageSize: number | undefined = 100;

  // page index
  @Input() currentPageIndex: number | undefined = 1;

  // changePage emitter
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();

  // unSub is subject used for free the memory from observable objects
  private unSub: Subject<any> = new Subject<any>();

  constructor(
    public scroll: ScrollDispatcher,
  ) {
    // infinity scroll Fun
    this.infinityScrollFn();
  }

  /**
   * infinityScrollFn
   * @function
   * @description infinity scroll for list
   * void
   */
  infinityScrollFn(): void {
    this.scroll.scrolled().pipe(
      takeUntil(this.unSub),
    ).subscribe((data: CdkScrollable | any) => {
      const scrollTop = data.getElementRef().nativeElement.scrollTop || 0;
      const scrollHeight = data.getElementRef().nativeElement.scrollHeight || 0;
      const clientHeight = this.repoListElement._elementRef.nativeElement.clientHeight
      // Scrolled to bottom emit changePage
      if (scrollHeight - scrollTop === clientHeight) {
        this.pageChanged(<PageEvent>{
          pageIndex: (this.currentPageIndex ?? 2),
        });
      }
    });
  }

  /**
   * pageChanged
   * @function
   * @description change current page index
   * @param event {pageEvent}
   * void
   */
  pageChanged(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex + 1;
    this.changePage.emit(this.currentPageIndex);
  }

  trackItem (index: number, item: RepoItem): number {
    return item.id;
  }

  ngOnDestroy(): void {
    if (this.unSub) {
      this.unSub.next();
      this.unSub.complete();
    }
  }
}
