import {
  inject,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { HomeComponent } from './home.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

let fixture: ComponentFixture<HomeComponent>;
let comp:    HomeComponent;
let de:      DebugElement;
let el:      HTMLElement;

describe('HomeComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, BreadcrumbComponent ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        AppState,
        HomeComponent,
        BreadcrumbComponent
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('h3'));
      el = de.nativeElement;
    });
  });


  // it('hello honey, iam home!', inject( ()=>{
  //   expect(1+1).toEqual(2);
  // } ));

  it('should display original href', () => {
    //console.log(comp);
    fixture.detectChanges();
    // expect(el.textContent).toContain(comp.href);
  });

  // it('should have default data', inject([ HomeComponent ], (home: HomeComponent) => {
  //   expect(home.localState).toEqual({ value: '' });
  // }));
  //
  // it('should have a title', inject([ HomeComponent ], (home: HomeComponent) => {
  //   expect(!!home.title).toEqual(true);
  // }));
  //
  // it('should log ngOnInit', inject([ HomeComponent ], (home: HomeComponent) => {
  //   spyOn(console, 'log');
  //   expect(console.log).not.toHaveBeenCalled();
  //
  //   home.ngOnInit();
  //   expect(console.log).toHaveBeenCalled();
  // }));

});
