import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now, Types } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({collection: 'Book', versionKey: false})
export class Book {

    _id: Types.ObjectId

    @Prop({required: false, type: String, default: null})
    code: string;

    @Prop({required: true, type: String})
    title: string;

    @Prop({required: true, type: String})
    author: string;

    @Prop({required: false, type: Number, default: 0})
    stock: number;

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);