import { MessageResponseDto } from "./message.dto";
import { MemberAuthResponseDto } from "./member.dto";

export interface ResponseAuthMemberDto {
    statusCode : Number;
    success: Boolean;
    message : String;
    data? : MemberAuthResponseDto;
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
    WRONGPASSWORD = 'WRONG PASSWORD'

}