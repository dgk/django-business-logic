// import {
//   inject,
//   TestBed,
//   ComponentFixture,
//   async
// } from '@angular/core/testing';
// import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
// import { By } from '@angular/platform-browser';
// import {
//   BaseRequestOptions,
//   ConnectionBackend,
//   Http
// } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';
//
// // Load the implementations that should be tested
// import { AppState } from '../app.service';
// import { HomeComponent } from './home.component';
//
// describe('HomeComponent', () => {
//   let fixture: ComponentFixture<HomeComponent>;
//   let comp:    HomeComponent;
//   let de:      DebugElement;
//   let el:      HTMLElement;
//
//
//   // provide our implementations or mocks to the dependency injector
//   beforeEach( async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ HomeComponent ],
//       providers: [
//         BaseRequestOptions,
//         MockBackend,
//         {
//           provide: Http,
//           useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
//             return new Http(backend, defaultOptions);
//           },
//           deps: [MockBackend, BaseRequestOptions]
//         },
//         AppState,
//         HomeComponent
//       ],
//       schemas:[ NO_ERRORS_SCHEMA ]
//     });
//     //.compileComponents()
//     //.then(() => {
//       fixture = TestBed.createComponent(HomeComponent);
//       comp = fixture.componentInstance;
//       de = fixture.debugElement.query(By.css('h3'));
//       el = de.nativeElement;
//     //});
//   }) );
//
//
//   // it('hello honey, iam home!', inject( ()=>{
//   //   expect(1+1).toEqual(2);
//   // } ));
//
//   it('should display original href', () => {
//     //expect(typeof fixture).toEqual('object');
//     fixture.detectChanges();
//     console.log(fixture.debugElement.nativeElement);
//     expect(el.textContent).toContain('Interfaces');
//   });
//
//   // it('should have default data', inject([ HomeComponent ], (home: HomeComponent) => {
//   //   expect(home.localState).toEqual({ value: '' });
//   // }));
//   //
//   // it('should have a title', inject([ HomeComponent ], (home: HomeComponent) => {
//   //   expect(!!home.title).toEqual(true);
//   // }));
//   //
//   // it('should log ngOnInit', inject([ HomeComponent ], (home: HomeComponent) => {
//   //   spyOn(console, 'log');
//   //   expect(console.log).not.toHaveBeenCalled();
//   //
//   //   home.ngOnInit();
//   //   expect(console.log).toHaveBeenCalled();
//   // }));
//
// });
