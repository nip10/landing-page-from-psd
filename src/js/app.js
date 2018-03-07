// $(() => {
//   console.log('Hello from jQuery!');
// });

console.log('hellpppo');

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getData() {
    console.log(`My name is ${this.name} and I'm ${this.age} years old`);
  }
}

const foo = new Person('John', 25);
foo.getData();
