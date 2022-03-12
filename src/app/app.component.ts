import { Component, Host, HostListener } from "@angular/core";
import { Box } from "./schema/box";


@Component({
  selector : 'app-root',
  templateUrl : 'app.component.html',
  styleUrls : ['./app.component.scss']
}) 
export class AppComponent {
  title = 'box-move'
  MAX_BOXES=9;
  boxes : Array<Box|undefined> = [];
  lastId = 0;
  selectedIndex = -1;
  toggleListener = false;

  constructor() {
    for(let i = 0; i < this.MAX_BOXES; ++i) {
      this.boxes.push(undefined);
    }
  }

  addBox(event) {
    for (let i = 0; i < this.MAX_BOXES; i++) {
      if (this.boxes[i] == undefined) {
        this.lastId = this.lastId+1;
        this.boxes[i] = {
          zindex : this.lastId*2,
          index : i,
          id : this.lastId,
          selected : false
        }
        break;
      }
    }
  }

  select(event, i) {
    if (this.selectedIndex < 0) {
      this.selectedIndex = i;
    } else {
      this.boxes[this.selectedIndex].selected = false;
      if (this.selectedIndex == i) {
        this.selectedIndex = -1;
        return;
      }
    }
    this.boxes[i].selected = !this.boxes[i].selected;
    this.selectedIndex = i;
  }

  removeBox(event) {
    if (this.selectedIndex > -1) {
      this.boxes[this.selectedIndex] = undefined;
    }
    this.selectedIndex = -1;
  }

  pressW() {
    console.log(this.selectedIndex);

    if (this.selectedIndex < 0) {
      return;
    }
    if (this.selectedIndex > 2 && this.selectedIndex < 16) {
      let temp = this.boxes[this.selectedIndex - 3];
      this.boxes[this.selectedIndex].index = this.selectedIndex - 3;
      this.boxes[this.selectedIndex-3] = this.boxes[this.selectedIndex];
      this.boxes[this.selectedIndex] = temp;
      if (temp !== undefined) {
        this.boxes[this.selectedIndex].index = this.selectedIndex;
      }
      this.selectedIndex -= 3;
    }
  }

  pressA(){
    console.log(this.selectedIndex);

    if(this.selectedIndex < 0) {
      return;
    }
    if(this.selectedIndex > 0){
      let temp = this.boxes[this.selectedIndex-1]
      this.boxes[this.selectedIndex].index = this.selectedIndex-1;
      this.boxes[this.selectedIndex-1] = this.boxes[this.selectedIndex];
      this.boxes[this.selectedIndex] = temp;
      if(temp !== undefined) {
        this.boxes[this.selectedIndex].index = this.selectedIndex;
      }
      this.selectedIndex -= 1
    }
  }



  pressS(){
    console.log(this.selectedIndex);
    if(this.selectedIndex < 0 && this.selectedIndex > 5) {
      return;
    }
    if(this.selectedIndex < 6){
      let temp = this.boxes[this.selectedIndex+3]
      this.boxes[this.selectedIndex].index = this.selectedIndex+4;
      this.boxes[this.selectedIndex+3] = this.boxes[this.selectedIndex];
      this.boxes[this.selectedIndex] = temp;
      if(temp !== undefined) {
        this.boxes[this.selectedIndex].index = this.selectedIndex;
      }
      this.selectedIndex += 3;
    }
  }

  pressD(){
    console.log(this.selectedIndex);
    if(this.selectedIndex < 0) {
      return;

    }
    if(this.selectedIndex < 8 ) {
      let temp = this.boxes[this.selectedIndex+1];
      this.boxes[this.selectedIndex].index = this.selectedIndex+1;
      this.boxes[this.selectedIndex+1] = this.boxes[this.selectedIndex];
      this.boxes[this.selectedIndex] = temp;
      if(temp !== undefined) {
        this.boxes[this.selectedIndex].index = this.selectedIndex;
      }
      this.selectedIndex += 1;
    }
  }


  toggleListenerFunc(event){
    this.toggleListener=!this.toggleListener;
    return (this.toggleListener);
  }

  @HostListener('window:keydown',['$event'])
  keyEvent(event: KeyboardEvent) {
    if(!this.toggleListener) {
      if(event.key.toUpperCase() == 'W' || event.key == 'ArrowUp') {
        this.pressW();
      }
      else if(event.key.toUpperCase() == 'A' || event.key == 'ArrowLeft') {
        this.pressA();
      }
      else if(event.key.toUpperCase() == 'S' || event.key == 'ArrowDown') {
        this.pressS();
      }
      else if(event.key.toUpperCase() == 'D' || event.key == 'ArrowRight') {
        this.pressD();
      }
      else if(event.key == 'Delete') {
        this.removeBox(event);
      }
    }
    else {
      return;
    } 
  }
}