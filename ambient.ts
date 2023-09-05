class AmbientContext {
  private static data: Record<string, any> = {};
  static set<T>(key: string, value: T){
    this.data[key] = value;
  }
  static get<T>(key: string): T{
    return this.data[key];
  }
}





class Scope {
  private data: Record<string, any> = {};
  set<T>(key: string, value: T){
     this.data[key] = value;
  }
  get<T>(key: string): T{
    return this.data[key];
  }
  private static stack: Scope[] = [];

  static getCurrent(): Scope {
    return this.stack[this.stack.length - 1];
  }
  static create(){
    this.stack.push(new Scope());
  }
  static dispose(){
    this.stack.pop();
  }
}

function vypisJmeno() {
  console.log(Scope.getCurrent().get("Jmeno"));
}

Scope.create();
  Scope.getCurrent().set("Jmeno", "Outter");
  vypisJmeno();
    Scope.create();
      Scope.getCurrent().set("Jmeno", "Inner 1");
      vypisJmeno();
      Scope.getCurrent().set("Jmeno", "Inner 2");
      vypisJmeno();
    Scope.dispose();
  vypisJmeno();
Scope.dispose();







