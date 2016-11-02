import { Injectable } from '@angular/core';

import { RestService } from './rest.service';

import { Reference, ReferenceCollection } from "../models/reference";

import {Observable} from "rxjs";

import * as find from "lodash/find";

@Injectable()
export class ReferenceService{
  references: any = new ReferenceCollection();

  constructor( private rest: RestService ){

  }

  fetchReferenceDescriptors(){

    return this.rest.get(this.references.getUrl()).map((data) => {
        if(this.references.getCollection().length == 0){
          data.forEach((ref) => {
            this.references.addNew( new Reference( ref.id, ref.name, ref.verbose_name ) );
          });
        }


    });

  }

  getReferenceName(type: string, id: string): any{

    // return this.fetchReferenceDescriptors().flatMap(() => {
    //   return this.getResultsForReferenceDescriptor(type, id);
    // });

  }

  getAllResultsForReferenceDescriptor(name: string){
    return this.rest.get( this.references.findByName(name).getUrl() );
  }

  getResultsForReferenceDescriptor(name: string, id: string){

    return this.rest.get( this.references.findByName(name).getUrl() ).map((data) => {

      return find( data.results, (item) => {
        return item.id == id;
      });

    });
  }

  generateXmlForToolbox(): string{
    let xml =   `<category name="References">`;

    this.references.getCollection().forEach((model) => {
      xml += `<block type="business_logic_reference">
                <field name="TYPE">${model.getName()}</field>
                <field name="VALUE">1</field>
              </block>`;
    });

    xml += `</category>`;

    return xml;
  }
}
