
const chalk = require('chalk');

console.log(chalk.blue('Looks like chalk does not work for some reason¿?¿?'));


class Elevator {
  constructor() {
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.waitingList = []; // array of objects (person)
    this.passengers = []; // array of objects (person)
    this.requests = []; // array of numbers
    this.direction = "Up";
  }

  start() {
    this.elevatorLoop = setInterval(() => this.update(), 1000);
  }

  stop() {
    clearInterval(this.elevatorLoop);
    console.log("**** No more requests ****");
  }

  update() {

    let floor = this.floor;
    let requests = this.requests;

    this.waitingList.map((elem, index) => {
      if (floor === elem.originFloor) {
        this._passengersEnter(floor);
      }
    });

    this.passengers.map((elem, index) => {
      if (floor === elem.destinationFloor) {
        this._passengersLeave(floor);
      }
    });

    if (requests[0] >= floor) {
      this.direction = "Up";
    } else {
      this.direction = "Down";
    }

    this.requests.forEach((elem, index) => {
      if (this.floor === this.requests[index]) {
        this.requests.splice(index, 1);
      }
    });

    switch (this.direction) {
      case "Up":
        this.floorUp();
        break;
      case "Down":
        this.floorDown();
        break;
      default:
    }

    if (!requests.length) {
       return this.stop();
    }
        this.log();
  }


  _passengersEnter(currentFloor) {
    this.waitingList.map((elem, index) => {
      if (currentFloor === elem.originFloor) {
        let enteringPerson = this.waitingList[index];
        this.passengers.push(enteringPerson);
        this.waitingList.splice(index, 1);
        this.requests.push(enteringPerson.destinationFloor);
        console.log(`/*************/\n${enteringPerson.name} just entered in the elevator.\n/*************/`);
      }
    });

  }
  _passengersLeave(currentFloor) {
    this.passengers.map((elem, index) => {
      if (currentFloor === elem.destinationFloor) {
        let leavingPerson = this.passengers[index];
        this.passengers.splice(index, 1);
        // console.log(this.requests);
        console.log(`/*************/\n      ${chalk.blue(leavingPerson.name)} has left the elevator.\n/*************/`);
      }
    });
  }

  floorUp() {
    if (this.floor < 10) {
      this.floor += 1;
    } else {
      this.floor = 10;
    }
  }

  floorDown() {
    if (this.floor > 0) {
      this.floor -= 1;
    } else {
      this.floor = 0;
    }
  }

  call(person) {
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
  }

  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
  }
}

module.exports = Elevator;
