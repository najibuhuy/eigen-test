import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now, Types } from 'mongoose';
import { Member } from './member.schema';
import { Book } from './book.schema';


export type MemberDocument = HydratedDocument<Member>;

@Schema({collection: 'Loan', versionKey: false})
export class Loan {

    _id: Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true })
    bookBorrower: Member;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true })
    book: Book;

    @Prop({ type: Boolean, required: false })
    isFinished: boolean;

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);