
const Person = require('./person.js');
const Elevator = require('./elevator.js');

let isa  = new Person("Isa",  0, 4);
let litz = new Person("Litz",  10, 2);
let raul = new Person("Raul", 1, 5);
let fer  = new Person("Fer",  3, 0);
let gonzu = new Person("Gonzu",  7, 4);


let elevator = new Elevator();

elevator.start();

elevator.call(isa);
elevator.call(litz); // This one broke it. Not anymore  >:D
elevator.call(raul);
elevator.call(fer);

setTimeout(() => {
  elevator.call(gonzu);
}, 10000);
