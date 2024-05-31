import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { MemberAuthResponseDto } from "./member.dto";
import { BookResponseDto } from "./book.dto";

export interface LoanResponseDto {
    member : MemberAuthResponseDto;
    book : BookResponseDto;
    createdAt?: string;
    updatedAt?: string;
}

export class CreateLoanDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your bookId for create a loan, mandatory'})
    bookId : string;
}

export class ReturnLoanDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your loanId for create a loan, mandatory'})
    loanId : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your bookId for create a loan, mandatory'})
    bookId : string;
}