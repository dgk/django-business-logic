import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Environment} from '../app/models/environment';

@Injectable()
export class MockService {

  private arguments: Observable<any>;
  public environment = new Environment({
    description: "description",
    libraries: [
      {
        title: "BookLibrary",
        functions: [
          {
            title: "Get Book from the shelf",
            description: "This is function!",
            is_returns_value: false,
            arguments: [
              { name: "shelf", verbose_name: "shelff", data_type: "number" },
              { name: "count", verbose_name: "countt", data_type: "number" }
            ]
          }
        ]
      }
    ]
  });

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

  getEnvironment(){
    return this.environment;
  }

  getFunction(func_name: string){

    return this.environment.libraries[0].functions[0];
  }


}
