import {Injectable, Injector, ReflectiveInjector} from '@angular/core';
import {Http,  Response, Headers, RequestOptions, URLSearchParams, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class BackendService {
  private baseUrl = '../../../business-logic/rest';
  private programInterfaceUrl = `${this.baseUrl}/program-interface`;
  private programVersionUrl = `${this.baseUrl}/program-version`;
  private newVersionUrl = `${this.programVersionUrl}/new`;
  private programUrl = `${this.baseUrl}/program`;

  private descriptorsUrl = `${this.baseUrl}/reference/descriptor`;

  constructor(private http: Http) {

  }

  listProgramInterfaces() {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.programInterfaceUrl, options)
      .map(this.extractData);
  }

  listProgramVersions(programId: number) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('program', String(programId));
    let options = new RequestOptions({headers: headers, search: urlSearchParams});

    return this.http.get(`${this.programVersionUrl}`, options)
      .map(this.extractData);
  }

  listPrograms(programInterfaceId: number) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('program_interface', String(programInterfaceId));
    let options = new RequestOptions({headers: headers, search: urlSearchParams});

    return this.http.get(`${this.programUrl}`, options)
      .map(this.extractData);
  }

  getProgramVersionById(id: number) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.programVersionUrl}/${id}`, options)
      .map(this.extractData);
  }

  saveVersion(version) {
    let csrftoken = this.getCookie('csrftoken');
    let headers = new Headers({'Content-Type': 'application/json'});
    if( csrftoken != undefined ) headers.append('X-CSRFToken', csrftoken);

    let options = new RequestOptions({headers: headers});

    return this.http.post(this.newVersionUrl, JSON.stringify(version), options)
      .map(this.extractData);
  }

  getReferenceDescriptors(){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.descriptorsUrl}`, options)
      .map(this.extractData);
  }

  getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  private extractData(res: Response) {
    return res.json();
  }
}
