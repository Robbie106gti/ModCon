export interface Option {
    location: Location[];
    default: Default[];
}

export interface Location {
    active: boolean;
    description: string;
    image: Image;
    skews: any;
    title: string;
}

export interface Default {
    title: string;
    image: Image;
    description: string;
}

export interface Image {
    createdAt: string;
    name: string;
    progress: number;
    url: string;
}
