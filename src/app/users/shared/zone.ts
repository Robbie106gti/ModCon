export class User3 {
  $key: string;
  name: string;
  email: string;
  lastLogin: string;
  provider: string;
  zone: string;
  photoURL: string;
  order: string;
  constructor(authData) {
    this.email    = authData.email;
    this.photoURL = authData.photoURL;
  }
}

export class Zone {
  $key: boolean;
}
export interface Roles {
  reader: boolean;
  author?: boolean;
  admin?:  boolean;
}
