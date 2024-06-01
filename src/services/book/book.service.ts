import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseMessageFailedEnum } from 'src/libs/dto/response.dto';
import { Book } from 'src/schema/book.schema';
import { BookResponseDto, CreateBookDto } from 'src/libs/dto/book.dto';
import { generateBookCode } from 'src/libs/helper/global.helper';
@Injectable()
export class BookService {
  constructor(
    @InjectModel('Book') private BookModel: Model<Book>,


) { }


  async createBook(dataCreateBook: CreateBookDto): Promise<Book> {
    try{
     let getTitleBook = await this.BookModel.findOne({
      title: dataCreateBook.title
     })
     if(getTitleBook) throw {status: HttpStatus.BAD_REQUEST, message: ResponseMessageFailedEnum.NOTUNIQUEBOOKTITLE }
     else {
      const createBookData : Book = await this.BookModel.create({
        title: dataCreateBook.title,
        author: dataCreateBook.author,
        code : generateBookCode(),
        stock : dataCreateBook.stock

      })
      return createBookData
     }
    }catch (e) {
      Logger.log(e)
      throw { status : e.status,message : e.message}
    }

  }

  async getListBook(): Promise<BookResponseDto[]> {
    try{
      return await this.BookModel.find({});
    }catch (e) {
      Logger.log(e)
      throw { status : e.status,message : e.message}
    }

  }


}