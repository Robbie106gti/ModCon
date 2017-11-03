export interface Access {
    active: boolean;
    images: Image[];
    options: Option[];
    skews: any;
    title: string;
}

export interface Image {
    createdAt: string;
    name: string;
    progress: number;
    url: string;
}

export interface Option {
    price: number;
    title: string;
}
