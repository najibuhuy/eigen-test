import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now, Types } from 'mongoose';
import { Member } from './member.schema';

export type MessageDocument = HydratedDocument<Member>;

@Schema({collection: 'Message', versionKey: false})
export class Message {

    _id: Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    senderId: Member;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    receiverId: Member;

    @Prop({required: true, type: String})
    messageText: string;

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);