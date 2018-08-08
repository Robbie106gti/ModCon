export class AccessNew {
  $key: string;
  title: string;
  body: string;
  active = true;
  timeStamp: Date = new Date();
  images: Images[];
}

export class Access {
  $key: string;
  title: string;
  active = true;
  body: string;
  timeStamp: Date = new Date();
  images: Images[];
  description: string;
  price: number;
  options: Option[];
}

export class Option {
  $key: string;
  title: string;
  description?: string;
  price: number;
  url?;
  string;
}

export class Accesss {
  $key: string;
  title: string;
  body: string;
  active = true;
  timeStamp: Date = new Date();
  images: Images[];
}

export class Images {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();
  mainImg: any;
  constructor(file: File) {
    this.file = file;
  }
}
