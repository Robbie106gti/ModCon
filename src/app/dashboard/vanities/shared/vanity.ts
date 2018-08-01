export class VanityNew {
  $key: string;
  title: string;
  body: string;
  active = true;
  timeStamp: Date = new Date();
  skews: Skews[];
  images: Images[];
  color?: any;
}

export class Vanity {
  $key: string;
  title: string;
  body: string;
  active = true;
  timeStamp: Date = new Date();
  skews: Skews[];
  images?: Images[];
  mainImg?: MainImg;
  color?: any;
}

export class Images {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: any;
  mainImg?: MainImg;
  constructor(file: File) {
    this.file = file;
    this.createdAt = firebase.database.ServerValue.TIMESTAMP;
  }
}

export class MainImg {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: any;
  constructor(file: File) {
    this.file = file;
    this.createdAt = firebase.database.ServerValue.TIMESTAMP;
  }
}

export class Skews {
  $key: string;
  title: string;
  active = true;
  canDollar: number;
  timeStamp: Date = new Date();
  drawing: Drawing;
}

export class SkewNew {
  $key: string;
  title: string;
  active = false;
  timeStamp: Date = new Date();
  drawing: Drawing;
}

export class Drawing {
  $key: string;
  skew: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();
  constructor(file: File) {
    this.file = file;
  }
}
