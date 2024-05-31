import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from 'src/schema/member.schema';
import { UpdateDataMemberDto, MemberAuthResponseDto } from 'src/libs/dto/member.dto';
import { getAge } from 'src/libs/helper/global.helper';
import { CreateLoanDto, LoanResponseDto, ReturnLoanDto } from 'src/libs/dto/loan.dto';
import { BookResponseDto } from 'src/libs/dto/book.dto';
import { Loan } from 'src/schema/loan.schema';
import { ResponseMessageFailedEnum } from 'src/libs/dto/response.dto';
import { dateToString, mongooseObjectId } from 'src/libs/helper/mongoose.helper';
import { Book } from 'src/schema/book.schema';

@Injectable()
export class LoanService {
  constructor(
    @InjectModel('Loan') private LoanModel: Model<Loan>,
    @InjectModel('Book') private BookModel: Model<Book>



) { }
  async getListBookLoan(memberId: string): Promise<BookResponseDto[]> {
    try{
       //query mongodb
       let pipeline = [
        {
          $lookup : {
            from: 'Member',
            localField: 'bookBorrower',
            foreignField: '_id',
            as: 'member'
          }
        },
        {
          $lookup : {
            from: 'Book',
            localField: 'book',
            foreignField: '_id',
            as: 'book'
          }
        },
        {
          $match : {
            'member._id' : mongooseObjectId(memberId)
          }
        },
        {
            '$project': {
              author : "$book.author",
              title: "$book.author",
              stock: "$book.author",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt"
            }
        },
      ]

      //execute the query
      const getListLoan : BookResponseDto[] = await this.LoanModel.aggregate(pipeline).exec()
      return getListLoan
      

    }catch (e) {
      Logger.log(e)
      throw { status : e.status,message : e.message}
    }

  }

  async createBookLoan(memberProfile: Member, dataCreate: CreateLoanDto): Promise<LoanResponseDto> {
    try{
      //get book
      const getBook : Book = await this.BookModel.findOne({_id: mongooseObjectId(dataCreate.bookId)})
      if(!getBook) throw({status: 400, message: ResponseMessageFailedEnum.BOOKNOTFOUND})
        
      //Check Members is not borrowed more than 2 books
      const checkMemberLoan = await this.LoanModel.countDocuments({bookBorrower: memberProfile._id})
      if(checkMemberLoan >= 2) throw({status: 400, message: ResponseMessageFailedEnum.LIMITBOOKED})

      //Check member is not being penalized
      if(memberProfile.isSuspended) throw({status: 400, message: ResponseMessageFailedEnum.SUSPENDEDMEMBER})
      
      //Check book's stock
      if(!getBook.stock) throw({status: 400, message: ResponseMessageFailedEnum.BOOKNOTFOUND})

      //create the loan data
      const LoanMod = new this.LoanModel({
        bookBorrower :memberProfile,
        book: getBook
      });
      await LoanMod.save()
      
      //update the book's stock
      const updateBookStock : Book = await this.BookModel.findByIdAndUpdate({_id: getBook._id},{stock: getBook.stock - 1})

      return {
        member: memberProfile,
        book : {
          author : updateBookStock.author,
          title: updateBookStock.title,
          stock: updateBookStock.stock,
          createdAt: dateToString(updateBookStock.createdAt),
          updatedAt: dateToString(updateBookStock.updatedAt)

        },
      }
    }catch (e) {
      Logger.log(e)
      throw { status : e.status,message : e.message}
    }

  }

  async returnBookLoan(memberProfile: Member, dataReturn: ReturnLoanDto): Promise<LoanResponseDto> {
    try{
      //get loan
      const getLoan : Loan = await this.LoanModel.findOne({_id: mongooseObjectId(dataReturn.loanId)})
      if(!getLoan) throw({status: 400, message: ResponseMessageFailedEnum.NOTFOUND})

      //get book
      const getBook: Book = await this.BookModel.findOne({_id: mongooseObjectId(dataReturn.bookId)})
      if(!getBook) throw({status: 400, message: ResponseMessageFailedEnum.BOOKNOTFOUND})
        
      //Check the loan date, If the book is returned after more than 7 days, the member will be subject to a penalty
      

      //update loan isFinished : true
      await this.BookModel.findByIdAndUpdate({isFinished: true},{stock: getBook.stock - 1})
      //update the book's stock
      const updateBookStock = await this.BookModel.findByIdAndUpdate({_id: dataReturn.bookId},{stock: getBook.stock + 1})

      return {
        member: memberProfile,
        book : {
          author : updateBookStock.author,
          title: updateBookStock.title,
          stock: updateBookStock.stock,
          createdAt: dateToString(updateBookStock.createdAt),
          updatedAt: dateToString(updateBookStock.updatedAt)

        },
      }
    }catch (e) {
      Logger.log(e)
      throw { status : e.status,message : e.message}
    }

  }

}
