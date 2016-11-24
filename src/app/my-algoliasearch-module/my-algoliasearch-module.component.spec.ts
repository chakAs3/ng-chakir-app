/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyAlgoliasearchModuleComponent } from './my-algoliasearch-module.component';

describe('MyAlgoliasearchModuleComponent', () => {
  let component: MyAlgoliasearchModuleComponent;
  let fixture: ComponentFixture<MyAlgoliasearchModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAlgoliasearchModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAlgoliasearchModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
