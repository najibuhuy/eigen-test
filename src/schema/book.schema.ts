import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now, SchemaTypes, Types } from 'mongoose';
import { MemberGenderEnum } from 'src/libs/dto/member.dto';

export type MemberDocument = HydratedDocument<Member>;

@Schema({collection: 'Member', versionKey: false})
export class Member {

    _id: Types.ObjectId

    @Prop({required: true, type: String})
    username: string;

    @Prop({required: true, type: String})
    email: string;

    @Prop({required: false, type: String, default: null})
    code: string;

    @Prop({required: true, type: String})
    password: string;

    @Prop({required: false, type: String, default: null})
    name: string;

    @Prop({required: false, type: String, default: null})
    image: string;


    @Prop({required: false})
    dob: string;

    @Prop({required: false, enum : [MemberGenderEnum.FEMALE, MemberGenderEnum.MALE, MemberGenderEnum.OTHER], default: MemberGenderEnum.MALE})
    gender: string;

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;
}

export const MemberSchema = SchemaFactory.createForClass(Member);