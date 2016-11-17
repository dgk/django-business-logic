import * as find from 'lodash/find';

export class Environment{
  title: string;
  description: string;

  libraries: Array<Library>;

  constructor(data: any){
    this.title = data['title'];
    this.description = data['description'];

    this.libraries = [];
    data['libraries'].forEach((lib) => {
      this.libraries.push(new Library(lib));
    });
  }
}

export class Library{
  title: string;
  functions: Array<Function>;

  constructor(lib: any){
    this.functions = [];

    this.title = lib.title;

    lib['functions'].forEach((func) => {
      this.functions.push(new Function(func));
    });
  }

  getFunctionByName(title: string){
    return find(this.functions, (func) => {
      return func.title == title;
    });
  }
}

export class Function{
  title: string;
  description: string;
  is_returns_value: boolean;
  args: Array<Arg>;

  constructor(func: any){
    this.args = [];

    this.title = func['title'];
    this.description = func['description'];
    this.is_returns_value = func['is_returns_value'];


    if(func.arg){
      func.args.forEach((arg) => {
        this.args.push(new Arg(arg));
      });
    }

  }
}

export class Arg{
  name: string;
  verbose_name: string;
  data_type: string;
  choices: Array<Choice>;

  constructor(arg: any){
    this.choices = [];

    this.name = arg.name;
    this.verbose_name = arg.verbose_name;
    this.data_type = arg.data_type;

    arg.choices.forEach((choice) => {
      this.choices.push(new Choice(choice));
    });
  }
}

export class Choice{
  value: string;
  title: string;

  constructor(choice){
    this.value = choice.value;
    this.title = choice.title;
  }
}
