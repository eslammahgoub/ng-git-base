import { Component, Input } from '@angular/core';
import { RepoItem, Utils } from '@shared/models';

@Component({
  selector: 'gitbase-repo-item',
  templateUrl: './repo-item.component.html',
})
export class RepoItemComponent {
  // current repo
  @Input() repo: RepoItem = {} as RepoItem;

  /**
   * getUrlIssue
   * @function
   * @description modify the current url from api url to github issues page
   * @param {string} url
   * @returns {string} url of github issue page for the repo
   */
  getUrlIssue(url: string): string {
    return Utils.getUrlIssue(url);
  }

  /**
   * getUpdatedDays
   * @function
   * @description get Time interval by owner name
   * @returns {number}
   */
  getUpdatedDays(date: string): number {
    const diff = new Date(new Date(date).getTime() - new Date().getTime());
    return diff.getUTCDate() - 1;
  }

}
