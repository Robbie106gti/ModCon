export class PantryNew {
  $key: string;
  title: string;
  body: string;
  active = true;
  timeStamp: Date = new Date();
  images: Images[];
  vanities: Vanities[];
  errors?: any;
}

export class Pantry {
  $key: string;
  title: string;
  body: string;
  active = true;
  timeStamp: Date = new Date();
  images: Images[];
  vanities: Vanities[];
  price: number;
}

export class Vanities {
  $key: boolean;
}

export class Images {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();
  constructor(file: File) {
    this.file = file;
  }
}
