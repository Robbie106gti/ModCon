export class MatNew {
  $key: string;
  title: string;
  body: string;
  active = true;
  timeStamp: Date = new Date();
  colors: Color[];
  images: Images[];
}

export class Mat {
    $key: string;
    title: string;
    body: string;
    active = true;
    timeStamp: Date = new Date();
    colors: Color[];
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

export class Color {
    $key: string;
    title: string;
    color: any;
    active = true;
    price: string;
    material: string;
    vanities: Vanities[];
    timeStamp: Date = new Date();
    image: ColorImg[];
}

export class Vanities {
  $key: string;
}

export class ColorNew {
    $key: string;
    title: string;
    active = false;
    timeStamp: Date = new Date();
    image: ColorImg[];
}

export class ColorImg {
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
