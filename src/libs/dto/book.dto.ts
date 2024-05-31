import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export interface BookResponseDto {
    author : string;
    title: string;
    stock: number;
    createdAt?: string ;
    updatedAt?: string;
}

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your name for create a book, mandatory'})
    name : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your name for author a book, mandatory'})
    author : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your title for create a book, mandatory'})
    title : string;

}