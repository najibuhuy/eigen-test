import {
    Body,
    Controller,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import {AuthMemberService} from './authMember.service';


import {ApiTags} from "@nestjs/swagger";
import { LoginMemberDto, RegisterMemberDto } from 'src/libs/dto/auth.dto';
import { ResponseAuthMemberDto, ResponseMessageSuccessEnum } from 'src/libs/dto/response.dto';
import { MemberAuthResponseDto } from 'src/libs/dto/member.dto';


@ApiTags('api/auth')
@Controller('api/auth')
export class AuthMemberController {
    constructor(
        private authService: AuthMemberService,
    ) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async registerMember(@Body() dto: RegisterMemberDto) : Promise<ResponseAuthMemberDto> {
        try {
            const registerProc : MemberAuthResponseDto= await this.authService.registerMember(dto);
            return {
                statusCode: HttpStatus.OK,
                success: true,
                message: ResponseMessageSuccessEnum.SUCCESSCREATE,
                data: registerProc,
            }
        } catch (e) {
            throw new HttpException({
                statusCode: e.status,
                success: false,
                message: e.message
            }, e.status)
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async loginMember(@Body() dto: LoginMemberDto) : Promise<ResponseAuthMemberDto>{
        try{
            const loginProc : MemberAuthResponseDto= await this.authService.loginMember(dto);
            return {
                statusCode: HttpStatus.OK,
                success: true,
                message: ResponseMessageSuccessEnum.SUCCESSLOGIN,
                data: loginProc,
            }
        } catch (e) {
            throw new HttpException({
                statusCode: e.status,
                success: false,
                message: e.message
            }, e.status)
        }
         
    }
}
