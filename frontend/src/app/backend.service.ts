/**
 * Created by Infirex on 5/27/2016.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

@Injectable()
export class BackendService {
  private baseUrl = '/business-logic/rest/';
  private programInterfaceUrl = `${this.baseUrl}/program-interface`;
  private programVersionUrl = `${this.baseUrl}/program-version`;
  private programUrl = `${this.baseUrl}/program`;

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
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.programUrl}`, options)
      .map(this.extractData);
  }

  getProgram(program: number) {

  }

  private extractData(res: Response) {
    return res.json();
  }
}
