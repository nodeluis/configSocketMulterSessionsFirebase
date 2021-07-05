import { model, Schema, Document } from 'mongoose';
import { Category } from '@/interfaces/category.interface';

const categorySchema: Schema = new Schema({
    path: String,
    realPath: String,
    name: String,
});

const categoryModel = model<Category & Document>('Category', categorySchema);

export default categoryModel;