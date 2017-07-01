
class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.waitingList = []; // array of objects (person)
    this.passengers = []; // array of objects (person)
    this.requests   = []; // array of nums
    this.direction  =  "Up";
  }

  start() {
    this.elevatorLoop = setInterval(() => this.update(), 1000);
  }
  stop() {
    clearInterval(this.elevatorLoop);
  }
  update() {

    let floor = this.floor;
    let direction = this.direction;






    this.log();
  }
  _passengersEnter(currentFloor) {
    this.waitingList.map((elem, index) => {
      if(currentFloor === elem.originFloor){
        let enteringPerson = this.waitingList[index];
        this.passengers.push(enteringPerson);
        this.waitingList.splice(index,1);
        this.requests.push(enteringPerson.destinationFloor);
        this.requests.shift();
        console.log(`${enteringPerson.name} just entered in the elevator.`);
      }
    });

  }
  _passengersLeave(currentFloor) {
    this.passengers.map((elem, index) => {
      if(currentFloor === elem.originFloor){
        let leavingPerson = this.passengers[index];
        this.passengers.splice(index,1);
        this.requests.shift();
        console.log(`${leavingPerson.name} has left the elevator.`);
      }
    });
  }

  floorUp() {
    if(this.floor < 10){
      this.floor += 1;
    } else{
      this.floor = 10;
    }
  }

  floorDown() {
    if(this.floor > 0){
      this.floor -= 1;
    } else{
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
