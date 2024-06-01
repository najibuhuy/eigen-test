import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, ValidateIf } from "class-validator";

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

export class createDataMemberDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your username for register, mandatory'})
    username : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your email for register, mandatory'})
    email : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your password for register, mandatory'})
    password : string;

    @IsString()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your name for register, optional'})
    name? : string;

    @IsString()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your image for register, optional'})
    image? : string;

    @IsString()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your dob for register, optional'})
    dob? : string;

    @IsString()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your gender for register, optional'})
    gender? : string;

}


export class LoginMemberDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your username for register, mandatory'})
    username : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your password for register, mandatory'})
    password : string;
}





