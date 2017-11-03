export interface Counter {
    active: boolean;
    images: Image[];
    skews: any;
    title: string;
    sink: string;
    price: number;
}

export interface Image {
    createdAt: string;
    name: string;
    progress: number;
    url: string;
}
