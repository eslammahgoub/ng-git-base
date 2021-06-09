import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { repoItem } from '@shared/mocks';


import { RepoItemComponent } from './repo-item.component';

describe('RepoItemComponent', () => {
  let component: RepoItemComponent;
  let fixture: ComponentFixture<RepoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ RepoItemComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(RepoItemComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render repo avatar if repo exist', () => {
    component.repo = repoItem;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('img[matListAvatar]')).toBeTruthy();
  });

  it('should render repo name if repo exist', () => {
    component.repo = repoItem;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[mat-line]:nth-child(2)').textContent.toLowerCase()).toBe(repoItem.name.toLowerCase());
  });

  it('should render repo description if repo exist', () => {
    component.repo = repoItem;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[mat-line]:nth-child(3)').textContent.toLowerCase()).toBe(repoItem.description.toLowerCase());
  });

  it('should render repo stars if repo exist', () => {
    component.repo = repoItem;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#stars').textContent.includes('Stars: ')).toBeTruthy();
  });

  it('should render repo submitted text if repo exist', () => {
    component.repo = repoItem;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#submitted').textContent.includes('Submitted')).toBeTruthy();
    expect(compiled.querySelector('#submitted').textContent.includes('days ago by')).toBeTruthy();
  });

  it('should render should getUpdatedDays return different from now to param date', () => {
    component.repo = repoItem;
    fixture.detectChanges();
    const date = repoItem.updated_at;
    const diff = new Date(new Date(date).getTime() - new Date().getTime());
    const value = diff.getUTCDate() - 1;
    expect(component.getUpdatedDays(date)).toBe(value);
  });
});
