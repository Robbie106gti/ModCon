export class TopNew {
  $key: string;
  title: string;
  body: string;
  active = true;
  timeStamp: Date = new Date();
  images: Images[];
}

export class Top {
    $key: string;
    title: string;
    body: string;
    active = true;
    timeStamp: Date = new Date();
    images: Images[];
    sink: string;
    skews: Item[];
    price: number;
}

export class Item {
  $key: string;
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