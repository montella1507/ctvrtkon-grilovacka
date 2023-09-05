const rules = /^[a-z](?:[a-z]+\d*|\d{2,})$/i;
const username = "pepa";

// Validace validity username
if (rules.test(username)) {
  console.log("Validace: Validní");
} else {
  console.log("Validace: Nevalidní");
}

// Porovnávání usernamu
let usernameA = "pepa";
let usernameB = "pePa";

console.log("Simple porovnání:" + (usernameA === usernameB));

const normalizedA = usernameA.trim().toUpperCase();
const normalizedB = usernameB.trim().toUpperCase();
console.log("Normalizované porovnání:" + (normalizedA === normalizedB));


class User {
  constructor(private name, private username, private password){}
}

const newUserUsername = "jerab08";
const newUserName = "Jiřík";
const password = "kjdqjd";

const user = new User(newUserUsername, newUserName, password);


class Address {
  constructor(private line1: string, private line2: string){}
} 

class Person {
  
}


import { parseVector } from './fakes';
import { ValueObject } from './value-object';

type Vector3Props = {
  x: number;
  y: number;
  z: number;
}
class Vector3 extends ValueObject<Vector3Props> {}

const vectorA = new Vector3({
  x: 1, y: 2, z: 3
});

const vectorB = new Vector3({
  x: 1, y: 2, z: 3
});

console.log(vectorA.equals(vectorB));


class FactoryVector3 extends ValueObject<Vector3Props> {
  private constructor(
    x: number, y: number, z: number
  ){
    super({x,y,z});
  } 

  static create(x: number, y: number, z: number) {
    return new FactoryVector3(x,y,z);
  }

  static parseFromString(vectorString: string) {
    // Logika na parsování (fake)
    const parsed = parseVector(vectorString);
    if (parsed === null) {
      throw new Error("Invalid arguments");
    }
    return parsed;
  }
}

//let v1 = new FactoryVector3();
let v2 = FactoryVector3.create(1,2,3);
let v3 = FactoryVector3.parseFromString("[1,2,3]");
