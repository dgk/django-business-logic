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

  post(url: string, obj: any){
    let csrftoken = this.getCookie('csrftoken');
    let headers = this.getHeaders();
    if( csrftoken != undefined ) headers.append('X-CSRFToken', csrftoken);

    let options = new RequestOptions({headers: headers});

    return this.http.post(url, JSON.stringify(obj), options)
      .map( ( response: Response ) => { return response.json() } );
  }

  getHeaders(): Headers{
    return new Headers({'Content-Type': 'application/json'});
  }

  getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
}
