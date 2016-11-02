import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MockService {

  private referenceDescriptors: Observable<any>;
  private reference1: Observable<any>;

  constructor(){
    this.referenceDescriptors = new Observable(observer => {
      observer.next([
        {
          "id": 1,
          "name": "books.Book",
          "verbose_name": "Book",
          "url": "/business-logic/rest/reference/list/books.Book",
          "search_fields": "",
          "content_type": 38
        },
        {
          "id": 2,
          "name": "books.Author",
          "verbose_name": "Author",
          "url": "/business-logic/rest/reference/list/books.Author",
          "search_fields": "",
          "content_type": 36
        },
        {
          "id": 3,
          "name": "books.Publisher",
          "verbose_name": "Publisher",
          "url": "/business-logic/rest/reference/list/books.Publisher",
          "search_fields": "",
          "content_type": 37
        }
      ]);
    });

    this.reference1 = new Observable(observer => {
      observer.next(
        {
          "id": 2,
          "name": "Dive Into Python"
        }
      );
    });
  }

  test(){
    return "This is MockService!";
  }

  getReferenceDescriptors(){
    return this.referenceDescriptors;
  }

  getReferenceName(type: string, id: string){
    return this.reference1;
  }
}
