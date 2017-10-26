export interface Sku {
    cabinet: Cabinet;
    material: Material;
    counter: Counter2;
    counterColor: CounterColor;
    pantry: Pantry2;
    accessories: Accessory[];
  }

export interface Cabinet {
    line: string;
    sku: string;
    cost: number;
    urlSketch: string;
    sampleImage: string;
}

export interface Material {
    material: string;
    color: string;
    cost: number;
    cat: string;
    materialImage: string;
}

export interface Counter2 {
    sink: string;
    imageSink: string;
    sku: string;
    cost: number;
    urlSketch: string;
    drilling: string;
    size: string;
    spread: string;
}

export interface CounterColor {
    color: string;
    materialImage: string;
}

export interface Pantry2 {
    sku: string;
    cost: number;
    quantity: number;
    total: number;
    urlSketch: string;
    hinged: string;
}

export interface Accessory {
    sku: string;
    option: string;
    url: string;
    cost: number;
    quantity: number;
    total: number;
    material?: string;
    materialCorrection?: number;
    color?: string;
    hinged?: string;
    location?: string;
    colorImage?: string;
}
