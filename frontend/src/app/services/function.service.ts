import {BaseService} from "./base.service";

export class FunctionService {

  constructor(){

  }

  getArgumentsForFunction(func_name: string){
    return [
      { verbose_name: "shelf", name: '123shelf', data_type: "number" },
      { verbose_name: "count", name: '123count', data_type: "number" }
    ];
  }

  test(){
    return "this is Func Service";
  }
}
