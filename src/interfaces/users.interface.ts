export interface User {
    _id: string;
    facebook:Facebook;
    google:Google;
    xpress:Xpress;
    tokenFirebase:Array<TokenFirebase>;
    created:Date;
    stores:Array<Stores>;
    forgotAccount:Array<ForgotAccount>;
    sessionConnections:Array<SessionConnections>;
    shoppingCart:Array<ShoppingCart>;
    address:Array<Address>;
    history:Array<History>;
    verificationUser:VerificationUser;
    likeStore:Array<LikeStore>;
    notify:Array<Notify>;
    products:Array<ProductsUser>;
}

export interface Facebook{
    avaible: boolean;
    firstName?: string;
    lastName?: string;
    email?: string;
    picture?: string;
    facebookId?: string;
    phone?: string;
    country?: string;
    city?: string;
}

export interface Google{
    avaible: boolean;
    firstName?: string;
    lastName?: string;
    email?: string;
    picture?: string;
    googleId?: string;
    phone?: string;
    country?: string;
    city?: string;
}

export interface Xpress{
    avaible: boolean;
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    path?: string;
    realPath?: string;
    phone?: string;
    country?: string;
    city?: string;
}

export interface TokenFirebase{
    _id: string;
    token:string;
}

export interface Stores{
    _id: string;
    storeId:string;
    creattor:boolean;
}

export interface ForgotAccount{
    _id: string;
    codegen: string;
    state: boolean;
    date: Date;
}

export interface SessionConnections{
    _id: string;
    date: Date;
}

export interface ShoppingCart{
    _id: string;
    date: Date;
    quantity: number;
    productId: string;
    qr: boolean;
    cash: boolean;
}

export interface Address{
    _id: string;
    state: boolean;
    departament: string;
    city: string;
    street: string;
    nro: number;
    reference: string;
    codeplus: string;
}

/*export interface History{
    date: Date;
    quantity: number;
    productId:string;
    qr:boolean;
    qrImage?:string;
    qrGetImage?:string;
    invoiceImage?:string;
    invoiceGetImage?:string;
    cash:boolean;
}*/

export interface History{
    _id: string;
    historyId: string;
}

export interface VerificationUser{
    dataIdentificationCard:DataIdentificationCard;
    dataProfile:DataProfile;
    fingerPrint:FingerPrint;
    codeDigit:CodeDigit;
}

export interface DataIdentificationCard{
    avaible:boolean;
    path:string;
    realPath:string;
    textCard:string;
}

export interface DataProfile{
    avaible:boolean;
    path:string;
    realPath:string;
}

export interface FingerPrint{
    avaible:boolean;
    code:string;
}

export interface CodeDigit{
    avaible:boolean;
    code:number;
}

export interface LikeStore{
    _id: string;
    storeId:string;
}

export interface Notify{
    _id: string;
    notifyId:string;
}

export interface ProductsUser{
    _id: string;
    productId:string;
}
