import {Injectable} from "@angular/core";
import {block_reference, block_function, block_field_get, block_field_set, block_date} from "../blocks/consts/blockTypes";

@Injectable()
export class xmlGenerator{

  forReferences(references): string{
    let xml =   `<category name="References">`;

    references.entities.forEach((ref) => {
      xml += `<block type="${block_reference.title}">
                <field name="TYPE">${ref.name}</field>
                <field name="VALUE">-1</field>
              </block>`;
    });

    xml += `</category>`;

    return xml;
  }

  forArguments(args): string{
    let xml =   `<category name="Argument fields">`;

    args.forEach((arg) => {
      xml += `<category name="${arg.verbose_name}">`;

      xml += `<block type="${block_field_set.title}">
                  <field name="VAR">${arg.name}.${arg.fields[0].name}</field>
                </block>`;
      arg.fields.forEach((field) => {
        xml += `<block type="${block_field_get.title}">
                  <field name="VAR">${arg.name}.${field.name}</field>
                </block>`;
      });
      xml += `</category>`;
    });

    xml += `</category>`;

    return xml;
  }
}
