export interface guitars {
    id:          number;
    name:        string;
    description: string;
    age:         number;
    active:      boolean;
    usageDate:   Date;
    imageURL:    string;
    type:        Type;
    genre:       string[];
    brand:       Brand;
}

export interface Brand {
    brandName:   string;
    website:     string;
    country:     Country;
    id:          number;
    yearFounded: number;
}

export enum Country {
    Japan = "Japan",
    UnitedStates = "United States",
}

export enum Type {
    Acoustic = "acoustic",
    Electric = "electric",
    SemiAcoustic = "semi-acoustic",
}
