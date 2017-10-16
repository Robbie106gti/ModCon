export interface IUser {
    uid:         string;
    displayName: string;
    zone?: string;
    providers?: string;
    email?: string;
    orderId?: string;
    image?: string;
    loading?:    boolean;
    currency?: string;
    value?: number;
    c?: number;
    error?: boolean;
}

export class User {
    constructor(
        public uid: string,
        public displayName: string,
        public zone: string,
        public email: string,
        public provider: string,
        public orderId: string,
        public currency: string,
        public image: string,
        public c: number,
        public loading: boolean = true,
        public error: boolean = false,
        public numbers: Numbers
    ) { }
}

export interface Numbers {
    favorites: number;
    orderqty: number;
    replies: number;
    unread: number;
}

export interface User2 {
    $key: string;
    name: string;
    email: string;
    lastLogin: string;
    provider: string;
    zone: string;
    image: string;
    orderId: string;
    currency?: string;
    c?: number;
    numbers?: Numbers;
  }
