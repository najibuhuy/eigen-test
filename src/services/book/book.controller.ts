import { Body, Controller, Get, HttpStatus, Logger, Post, Put, UseGuards } from '@nestjs/common';
import {  ResponseGetBookDto, ResponseGetListBookByMemberDto,  ResponseMessageSuccessEnum } from 'src/libs/dto/response.dto';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookService } from './book.service';
import { CreateBookDto } from 'src/libs/dto/book.dto';
import { Book } from 'src/schema/book.schema';

@Controller('/api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('')
  async createBook(@Body() dataBook : CreateBookDto): Promise<ResponseGetBookDto> {
    try{
      const getProfile = await this.bookService.createBook(dataBook);
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

  @Get('')
  async getListBook(): Promise<ResponseGetListBookByMemberDto> {
    try{
      const getProfile = await this.bookService.getListBook();
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
}
