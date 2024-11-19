export default class EventEmitter {
  private events: Map<string, any>;

  constructor() {
    this.events = new Map();
  }

  // Add an event listener
  on(event: string, listener: any) {
    if (!this.events.get(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  // Remove an event listener
  off(event: string, listenerToRemove: any) {
    if (!this.events.get(event)) return;

    this.events.set(
      event,
      this.events
        .get(event)
        .filter((listener: any) => listener !== listenerToRemove)
    );
  }

  // Emit an event
  emit(event: string, data: any) {
    if (!this.events.get(event)) return;

    this.events.get(event).forEach((listener: any) => listener(data));
  }
}
