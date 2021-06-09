import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { RepositoryService } from '@core/services';
import { repoResponse } from '@shared/mocks';
import { Order, RepoSearchResponse, Sort } from '@shared/models';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let mockRepositoryService;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    mockRepositoryService = TestBed.inject(RepositoryService);

    spyOn(mockRepositoryService, 'getAllRepositories').and.returnValue(of(repoResponse as RepoSearchResponse)); // mock output of function
    fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.items = [];
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render top element', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#top')).toBeTruthy();
  });

  it('should render wrapper element', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.wrapper')).toBeTruthy();
  });

  it('should render gitbase-header element', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('gitbase-header')).toBeTruthy();
  });

  it('should render gitbase-viewer element', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('gitbase-viewer')).toBeTruthy();
  });

  it('should render bottom element', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#bottom')).toBeTruthy();
  });

  it('should render gitbase-repo-list element', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('gitbase-repo-list')).toBeTruthy();
  });


  it('should getItems fun get Items from the repo api', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.items.length).toEqual(repoResponse.items.length);
  });

  it('should initOptions fun init the options to specific values', () => {
    fixture.componentInstance.initOptions();
    fixture.detectChanges();
    expect(fixture.componentInstance.options.page).toEqual(1);
    expect(fixture.componentInstance.options.q).toEqual('created:>2017-10-22');
    expect(fixture.componentInstance.options.sort).toEqual(Sort.stars);
    expect(fixture.componentInstance.options.order).toEqual(Order.desc);
    expect(fixture.componentInstance.options.per_page).toEqual(100);
  });

  it('should changePage fun change the cureent page number', () => {
    fixture.componentInstance.options.page = 1;
    fixture.componentInstance.changePage(2);
    expect(fixture.componentInstance.options.page).toEqual(2);
  });

});
