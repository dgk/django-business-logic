import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MockService {

  private arguments: Observable<any>;
  public environment = {
    libraries: [
      {
        title: "BookLibrary",
        functions: [
          {
            name: "Get Book from the shelf",
            returnValue: false,
            arguments: [
              { name: "shelf", data_type: "number" },
              { name: "count", data_type: "number" }
            ]
          }
        ]
      }
    ]
  };

  constructor(){
    this.arguments = new Observable(observer => {
      observer.next([
        {
          "fields": [
            {
              "verbose_name": "Book title",
              "content_type": null,
              "name": "title",
              "data_type": "string"
            }
          ],
          "verbose_name": "Book",
          "content_type": {
            "name": "books.Book",
            "verbose_name": "Book",
            "id": 37
          },
          "name": "book"
        }
      ]);
    });


  }

  test(){
    return "This is MockService!";
  }

  getFieldList(){
    return [['Book title', 'book.title']];
  }

  getVerboseNameForField(value: string){
    if(value == 'book.title'){
      return 'Book title';
    }else return "I dont know";
  }

  getArgumentsForFunction(func_name: string){
    return this.environment.libraries[0].functions[0].arguments;
  }

}
