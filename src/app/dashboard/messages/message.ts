export class Message {
  message: string;
  to: string;
  toUID: string;
  from: string;
  fromUID: string;
  read: boolean = false;
  timestamp: any;
  sentId?: string;
  receivedId?: string;
  threadId?: string;
  constructor(mes) {
    this.message = mes.message;
    this.to = mes.to;
    this.toUID = mes.toUID;
    this.from = mes.from;
    this.fromUID = mes.fromUID ;
    this.read = mes.read || false;
  }
}

export class NewMessage {
  message: string;
}

export interface Thread {
  read: boolean;
  message: string;
  from: string;
  fromUID: string;
  timestamp?: any;
}
