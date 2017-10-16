export class ConfigNew {
  $key: string;
  title: string;
  body: string;
  active = true;
  timeStamp: Date = new Date();
  images: Images[];
}

export class Config {
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
  constructor(file: File) {
    this.file = file;
  }
}