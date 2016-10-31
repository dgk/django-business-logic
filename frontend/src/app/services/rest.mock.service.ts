import {Injectable, Injector, ReflectiveInjector} from '@angular/core';
import {Http,  Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestMockService{

  constructor() {

  }

  get(url: string) {
    switch(url){
      case "/business-logic/rest/program-interface":
        return new Observable(observer => observer.next(
          {
            "count": 1,
            "next": null,
            "previous": null,
            "results": [
              {
                "id": 1,
                "url": "http://localhost:8000/business-logic/rest/program-interface/1",
                "title": "Book",
                "code": "",
                "creation_time": "2016-05-04T09:47:57.533000Z",
                "modification_time": "2016-05-16T08:55:30.911000Z"
              }
            ]
          }
        ));
    }

  }

  post(url: string){

  }

}
