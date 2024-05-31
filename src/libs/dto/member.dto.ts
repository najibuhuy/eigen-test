import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, ValidateIf } from "class-validator";

export enum MemberGenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export interface MemberAuthResponseDto {
    username : string;
    email : string;
    name? : string;
    image? : string;
    token?: string;
    age?: string;
}

export class UpdateDataMemberDto {
    @IsString()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your name for update data, optional'})
    name? : string;

    @IsString()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your image for update data, optional'})
    image? : string;

    @IsString()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your dob for update data, optional'})
    dob? : string;

    @IsString()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your gender for update data, optional'})
    gender? : string;

}