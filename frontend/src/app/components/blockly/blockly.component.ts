import {
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from '../../reducers';

@Component({
  selector: 'blockly',
  template: `
    <div #blocklyArea></div>   
    <div #blocklyDiv [ngStyle]="style"></div>
    `,
  providers: []
})

export class BlocklyComponent {
  private loading: any;

  @Input() version: any;
  // @Input() xmlForReferenceDescriptors: any;
  // @Input() xmlForArgumentFields: any;
  // @Input() xmlForFunctionLibs: any;

  @ViewChild('blocklyDiv') blocklyDiv;
  @ViewChild('blocklyArea') blocklyArea;

  // style = {
  //   width: '100%',
  //   height: '90%',
  //   position: 'absolute'
  // };

  private workspace: Blockly.Workspace;

  constructor(private store: Store<fromRoot.State>){
    this.loading = this.store.let(fromRoot.getInfoState);

    this.loading.subscribe(info => {
      if(info.loaded && info.step == "Editor"){
        console.log("now!");
      }
    });
  }


  ngOnViewInit() {

  }

  // ${this.xmlForReferenceDescriptors}
  // ${this.xmlForArgumentFields}
  // ${this.xmlForFunctionLibs}

  createWorkspace(){
      this.workspace.clear();

      let toolbox = `<xml>
                        ${require('./blockly-toolset.html')}
                     </xml>`;
      this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
        {
          toolbox: toolbox,
          trashcan: true,
          sounds: false,
          media: "./blockly/"
        });

      this.loadVersionXml();

  }

  loadVersionXml(){
    let xml = Blockly.Xml.textToDom(this.version["xml"]);

    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }


  ngOnChanges(changes: any): any {

    if(changes.version && changes.version.currentValue){
      // this.createWorkspace();
    }

    // if(this.xmlForReferenceDescriptors && this.xmlForArgumentFields){
    //   this.createWorkspace();
    // }

  }

  getXml(){
    return Blockly.Xml.domToText( Blockly.Xml.workspaceToDom(this.workspace, false) );
  }

  initXml(xmlText) {
    this.workspace.clear();
    let xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }
}
