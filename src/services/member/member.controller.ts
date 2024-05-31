import { Body, Controller, Get, HttpStatus, Logger, Post, Put, UseGuards } from '@nestjs/common';
import { ResponseAuthMemberDto, ResponseMessageSuccessEnum } from 'src/libs/dto/response.dto';
import { UpdateDataMemberDto } from 'src/libs/dto/member.dto';
import { Member } from 'src/schema/member.schema';
import { GetMember } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { MemberService } from './member.service';

@Controller('/api/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('')
  @UseGuards(JwtGuard)
  async getProfile(@GetMember() member : Member): Promise<ResponseAuthMemberDto> {
    try{
      const getProfile = await this.memberService.getProfile(member);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: ResponseMessageSuccessEnum.SUCCESSCREATE,
        data: getProfile,
      }
    } catch(e) {
      Logger.log(e)
      throw { statusCode : e.status,message : e.message}
    }
  }

  @Post('')
  @UseGuards(JwtGuard)
  async createProfile(@GetMember() member : Member, @Body() dataUpdate : UpdateDataMemberDto): Promise<ResponseAuthMemberDto> {
    try{
      const getProfile = await this.memberService.updateProfile(member, dataUpdate);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: ResponseMessageSuccessEnum.SUCCESSCREATE,
        data: getProfile,
      }
    } catch(e) {
      Logger.log(e)
      throw { statusCode : e.status,message : e.message}
    }
  }

  @Put('')
  @UseGuards(JwtGuard)
  async updateProfile(@GetMember() member : Member, @Body() dataUpdate : UpdateDataMemberDto): Promise<ResponseAuthMemberDto> {
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
