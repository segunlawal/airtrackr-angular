import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabStateService {
  private tabState: string = 'Flights';
  stateChanged = new EventEmitter<string>();

  getState() {
    return this.tabState;
  }

  setState(newState: string) {
    this.tabState = newState;
    this.stateChanged.emit(newState);
  }
}
