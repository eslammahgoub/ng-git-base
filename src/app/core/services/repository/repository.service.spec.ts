import { repoItem } from '@shared/mocks';
import { RepoSearchResponse } from '@shared/models';

import { RepositoryService } from './repository.service';
import { of } from 'rxjs';

describe('RepositoryService', () => {
  let service: RepositoryService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new RepositoryService(httpClientSpy as any);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    const expectedRepoItem: RepoSearchResponse = {
      items: [
        repoItem,
        repoItem,
      ],
      total_count: 100,
    };

    httpClientSpy.get.and.returnValue(of(expectedRepoItem));

    service.getAllRepositories({
      q: 'any',
      page: 1,
      per_page: 100,
    }).subscribe(
      repoResponseResult => {
        expect(repoResponseResult).toEqual(expectedRepoItem, 'expected Repos');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

});

