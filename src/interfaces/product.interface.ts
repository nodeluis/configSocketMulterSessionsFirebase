export interface Product {
    _id: string;
    storeId?: string;
    userId?: string;
    name: string;
    description: string;
    smallDescription: string;
    offer: Offer;
    defaultImage: DefaultImage;
    price: Number;
    date: Date;
    likes: Number;
    quantityAvailable: Number;
    priceSend: Number;
    state: Boolean;
    sales: Array<SalesAssociated>;
    category: Array<CategoryAssociated>;
    gallery: Array<Gallery>;
    comments: Array<CommnetAssociated>,
}

export interface Offer{
    avaible:boolean,
    offerPice:number,
}

export interface DefaultImage{
    path:string,
    realPath:string,
    date: Date
}

export interface SalesAssociated{
    _id: string; 
}

export interface CategoryAssociated{
    _id: string; 
}

export interface Gallery{
    path: string,
    realPath: string,
    description: string,
    date: Date
}

export interface CommnetAssociated{
    _id: string; 
}