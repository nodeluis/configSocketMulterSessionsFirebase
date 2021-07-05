import { model, Schema, Document } from 'mongoose';
import { Product } from '@/interfaces/product.interface';

const productSchema: Schema = new Schema({
    storeId: String,
    userId: String,
    name: String,
    description: String,
    smallDescription: String,
    price: Number,
    offer: {
        avaible:Boolean,
        offerPice:Number,
    },
    defaultImage: {
        path:String,
        realPath:String,
        date: Date
    },
    date: Date,
    likes: Number,
    quantityAvailable: Number,
    priceSend: Number,
    state: Boolean,
    sales: {
        type:Array,
        default:[]
    },
    category: {
        type:Array,
        default:[]
    },
    gallery: [{
        path: String,
        realPath: String,
        description: String,
        date: Date
    }],
    comments: {
        type:Array,
        default:[]
    },
});

const productModel = model<Product & Document>('Product', productSchema);

export default productModel;