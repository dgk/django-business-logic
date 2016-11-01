import {Injectable} from '@angular/core';
import {Http,  Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RestService{

  constructor(private http: Http) {

  }

  get(url: string){
    let headers = this.getHeaders();
    let options = new RequestOptions({headers: headers});

    return this.http.get(url, options)
      .map( ( response: Response ) => { return response.json() } );
  }

  getWithSearchParams(url:string, params: any){
    let headers = this.getHeaders();
    let urlSearchParams = new URLSearchParams();

    params.forEach( (param) => {
      urlSearchParams.append(param[0], param[1]);
    });

    let options = new RequestOptions({headers: headers, search: urlSearchParams});
    return this.http.get(url, options)
      .map( ( response: Response ) => { return response.json() } );
  }

  post(url: string){

  }

  getHeaders(): Headers{
    return new Headers({'Content-Type': 'application/json'});
  }
}
