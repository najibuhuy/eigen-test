import { Body, Controller, Get, HttpStatus, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ResponseGetListBookByMemberDto, ResponseCreateLoanDto, ResponseMessageSuccessEnum } from 'src/libs/dto/response.dto';
import { UpdateDataMemberDto } from 'src/libs/dto/member.dto';
import { Member } from 'src/schema/member.schema';
import { GetMember } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { LoanService } from './loan.service';
import { CreateBookDto } from 'src/libs/dto/book.dto';
import { CreateLoanDto, ReturnLoanDto } from 'src/libs/dto/loan.dto';

@Controller('/api/loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get('/:memberId')
  @UseGuards(JwtGuard)
  async getListBookLoan(@Param() memberId : string): Promise<ResponseGetListBookByMemberDto> {
    try{
      const getListBookLoan = await this.loanService.getListBookLoan(memberId);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        data: getListBookLoan,
        message: ResponseMessageSuccessEnum.SUCCESSCREATE,
      }
    } catch(e) {
      Logger.log(e)
      throw { statusCode : e.status,message : e.message}
    }
  }

  @Post('/create')
  @UseGuards(JwtGuard)
  async createBookLoan(@GetMember() member : Member, @Body() dataCreate : CreateLoanDto): Promise<ResponseCreateLoanDto> {
    try{
      const createBookLoan = await this.loanService.createBookLoan(member, dataCreate);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        data: createBookLoan,
        message: ResponseMessageSuccessEnum.SUCCESSCREATE
      }
    } catch(e) {
      Logger.log(e)
      throw { statusCode : e.status,message : e.message}
    }
  }

  @Post('/return')
  @UseGuards(JwtGuard)
  async returnBookLoan(@GetMember() member : Member, @Body() dataReturn : ReturnLoanDto): Promise<ResponseCreateLoanDto> {
    try{
      const returnBookLoan = await this.loanService.returnBookLoan(member, dataReturn);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        data: returnBookLoan,
        message: ResponseMessageSuccessEnum.SUCCESSCREATE
      }
    } catch(e) {
      Logger.log(e)
      throw { statusCode : e.status,message : e.message}
    }
  }
}
