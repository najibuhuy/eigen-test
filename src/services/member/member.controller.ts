import { Body, Controller, Get, HttpStatus, Logger, Post, Put, UseGuards } from '@nestjs/common';
import { ResponseAuthMemberDto, ResponseMemberListDto, ResponseMessageSuccessEnum } from 'src/libs/dto/response.dto';
import { LoginMemberDto, UpdateDataMemberDto, createDataMemberDto } from 'src/libs/dto/member.dto';
import { Member } from 'src/schema/member.schema';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { MemberService } from './member.service';

@Controller('/api/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('')
  @UseGuards(JwtGuard)
  async getProfile(@GetUser() member : Member): Promise<ResponseAuthMemberDto> {
    try{
      const getProfile = await this.memberService.getProfile(member);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: ResponseMessageSuccessEnum.SUCCESSGET,
        data: getProfile,
      }
    } catch(e) {
      Logger.log(e)
      throw { statusCode : e.status,message : e.message}
    }
  }

  @Get('list')
  async getListMember(): Promise<ResponseMemberListDto> {
    try{
      const getProfile = await this.memberService.getListMember();
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: ResponseMessageSuccessEnum.SUCCESSGET,
        data: getProfile,
      }
    } catch(e) {
      Logger.log(e)
      throw { statusCode : e.status,message : e.message}
    }
  }

  @Put('')
  @UseGuards(JwtGuard)
  async updateProfile(@GetUser() member : Member, @Body() dataUpdate : UpdateDataMemberDto): Promise<ResponseAuthMemberDto> {
    try{
      const getProfile = await this.memberService.updateProfile(member, dataUpdate);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: ResponseMessageSuccessEnum.SUCCESSUPDATE,
        data: getProfile,
      }
    } catch(e) {
      Logger.log(e)
      throw { statusCode : e.status,message : e.message}
    }
  }
}
