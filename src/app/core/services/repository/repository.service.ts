import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepoParam, RepoSearchResponse } from '@shared/models';
import { Observable } from 'rxjs';

// searching url for repos
const REPOSITORY_URL = 'https://api.github.com/search/repositories';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  globalHeaders: HttpHeaders = new HttpHeaders({
    'Accept': 'application/vnd.github.v3+json'
  });

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * getAllRepositories
   * @function
   * @description get all repos from the github public api
   * @param repoParam {RepoParam}
   * @returns {Observable<RepoSearchResponse>}
   */
  getAllRepositories(repoParam: RepoParam): Observable<RepoSearchResponse> {
    let params = new HttpParams();
    const headers = this.globalHeaders;

    Object.keys(repoParam).forEach((key : string) => {
      const value: any = repoParam[key as keyof RepoParam];
      params = params.append(key, value);
    });

    return this.http.get(REPOSITORY_URL, {
      headers,
      params,
    }) as Observable<RepoSearchResponse>;
  }

}
