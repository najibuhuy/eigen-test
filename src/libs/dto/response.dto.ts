import { MessageResponseDto } from "./message.dto";
import { MemberAuthResponseDto } from "./member.dto";
import { LoanResponseDto } from "./loan.dto";
import { BookResponseDto } from "./book.dto";

export interface ResponseAuthMemberDto {
    statusCode : Number;
    success: Boolean;
    data? : MemberAuthResponseDto;
    message : String;
}

export interface ResponseCreateLoanDto {
    statusCode : Number;
    success: Boolean;
    data : LoanResponseDto;
    message : String;
}

export interface ResponseGetListBookByMemberDto {
    statusCode : Number;
    success: Boolean;
    data : BookResponseDto[];
    message : String;
}

export interface ResponseMessageMemberDto {
    statusCode : Number;
    success: Boolean;
    message : String;
    data? : MessageResponseDto[];
}

export enum ResponseMessageSuccessEnum {
    SUCCESSCREATE = 'SUCCESS CREATE',
    SUCCESSUPDATE = 'SUCCESS UPDATE',
    SUCCESSGET = 'SUCCESS GET',
    SUCCESSLOGIN = 'SUCCESS LOGIN',
    SUCCESSSENDMESSAGE = 'SUCCESS SEND MESSAGE',
}

export enum ResponseMessageFailedEnum {
    BADREQUEST = 'BAD REQUEST',
    INTERNALSERVERERROR = 'INTERNAL SERVER ERROR',
    NOTUNIQUEEMAIL = 'EMAIL EXIST',
    NOTUNIQUEUSERNAME = 'USERNAME EXIST',
    FAILEDPROCESS = 'FAILED TO PROCESS',
    NOTFOUND = 'NOT FOUND',
    NOTFOUNDMEMBER = 'NOT FOUND MEMBER',
    NOTFOUNDRECEIVER = 'NOT FOUND RECEIVER',
    WRONGPASSWORD = 'WRONG PASSWORD',
    LIMITBOOKED = 'ALREADY BORROW 2 BOOKS',
    SUSPENDEDMEMBER = 'MEMBER HAS SUSPENDED',
    BOOKNOTFOUND = 'BOOK NOT FOUND'


}