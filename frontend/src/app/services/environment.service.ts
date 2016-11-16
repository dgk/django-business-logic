import {BaseService} from "./base.service";

export class EnvironmentService {

  constructor(){

  }

  getFunction(func_name: string){
    return {
      name: "Get Book from the shelf",
      description: "some description",
      returnValue: false,
      args: [
        { verbose_name: "shelf",
          name: '123shelf',
          data_type: "number" },
        { verbose_name: "count",
          name: '123count',
          data_type: "number" }
      ]
    }
  }

  test(){
    return "this is Func Service";
  }
}
