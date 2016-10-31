import {Injectable, Injector, ReflectiveInjector} from '@angular/core';
import {Http,  Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RestService{

  constructor(private http: Http) {

  }

  get(url: string){

  }

  post(url: string){

  }

  getHeaders(): Headers{
    return new Headers({'Content-Type': 'application/json'});
  }
}
