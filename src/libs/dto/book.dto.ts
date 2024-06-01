import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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
    @ApiProperty({type: String, description: 'fill your title for create a book, mandatory'})
    title : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your name for author a book, mandatory'})
    author : string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type: Number, description: 'fill your stock for create a book, mandatory'})
    stock : number;

}