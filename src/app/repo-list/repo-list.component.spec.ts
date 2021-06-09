import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { PageEvent } from '@angular/material/paginator';
import { repoResponse } from '@shared/mocks';

import { RepoListComponent } from './repo-list.component';

describe('RepoListComponent', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ RepoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render sub header with repoCount if reposCount exist', () => {
    component.reposCount = repoResponse.total_count;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div[mat-subheader]')).toBeTruthy();
    expect(compiled.querySelector('div[mat-subheader]').textContent).toBe(`${component.reposCount} repository results`);
  });

  it('should render list of repos items if repos exist', () => {
    component.reposCount = repoResponse.total_count;
    component.repos = repoResponse.items;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-list')).toBeTruthy();
  });

  // it('should render mat-paginator', () => {
  //   component.reposCount = repoResponse.total_count;
  //   component.repos = repoResponse.items;
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('mat-paginator')).toBeTruthy();
  // });

  it('should render gitbase-repo-item', () => {
    component.reposCount = repoResponse.total_count;
    component.repos = repoResponse.items;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('gitbase-repo-item')).toBeTruthy();
  });

});
