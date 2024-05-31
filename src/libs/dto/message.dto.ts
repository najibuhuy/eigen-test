import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export interface MessageResponseDto {
    receiver? : string,
    username? : string;
    name? : string;
    messageText : string;
    createdAt : Date;
}

export interface PublishMessageDto {
    sender : string;
    message: string;
}

export class SendMessageUserDto {
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your name for send Message, required'})
    sendTo : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your message for send message, required'})
    message : string;

}