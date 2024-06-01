import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from 'src/schema/member.schema';
import { dateToString } from 'src/libs/helper/global.helper';
import { CreateLoanDto, LoanResponseDto, ReturnLoanDto } from 'src/libs/dto/loan.dto';
import { BookResponseDto } from 'src/libs/dto/book.dto';
import { Loan } from 'src/schema/loan.schema';
import { ResponseMessageFailedEnum } from 'src/libs/dto/response.dto';
import {  mongooseObjectId } from 'src/libs/helper/mongoose.helper';
import { Book } from 'src/schema/book.schema';
import { addDate, isAfterDate, substractDateType } from 'src/libs/helper/dayjs.helper';

@Injectable()
export class LoanService {
  constructor(
    @InjectModel('Loan') private LoanModel: Model<Loan>,
    @InjectModel('Book') private BookModel: Model<Book>,
    @InjectModel('Member') private MemberModel: Model<Member>

) { }
  async getListBookLoan(dto: {memberId: string}): Promise<BookResponseDto[]> {
    try{
       //query mongodb
       let pipeline = [
        {
          $lookup : {
            from: 'Loan',
            localField: '_id',
            foreignField: 'book',
            as: 'loan'
          }
        },
        {
          $lookup : {
            from: 'Member',
            localField: 'loan.bookBorrower',
            foreignField: '_id',
            as: 'member'
          }
        },
        { $unwind: "$member" },
        { $unwind: "$loan" },

        {
          $match : {
            'member._id' : mongooseObjectId(dto.memberId)
          }
        },
        {
            '$project': {
              bookBorrower: "$member.name",
              IsSuspended: "$member.isSuspended",
              limitTime: "$loan.limitReturnTime",
              author : "$author",
              title: "$title",
              stock: "$stock",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt"
            }
        },
      ]

      //execute the query
      const getListLoan : BookResponseDto[] = await this.BookModel.aggregate(pipeline).exec()
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
        book: getBook,
        isFinished : false,
        limitReturnTime: addDate(dateToString(new Date()), 7, substractDateType.DAY )
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
        limitReturnTime: dateToString(LoanMod.limitReturnTime)
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
      const checkLImitReturnTime = isAfterDate(dateToString(getLoan.limitReturnTime), dateToString(new Date))
      if(checkLImitReturnTime) {
        await this.MemberModel.findByIdAndUpdate(
          {_id: memberProfile._id}, 
          {
            isSuspended: true, 
            suspendTime: addDate(dateToString(new Date()), 3, substractDateType.DAY )
          }
        )
      }

      //update loan isFinished : true
      const updateLoanFinished = await this.LoanModel.findByIdAndUpdate({_id: getLoan._id},{isFinished: true})

      if(updateLoanFinished) {
        
        //update the book's stock
        const updateBookStock = await this.BookModel.findByIdAndUpdate({_id: dataReturn.bookId},{stock: getBook.stock + 1})
        
        return {
        member: memberProfile,
        book : {
          author : updateBookStock.author,
          title: updateBookStock.title,
          stock: updateBookStock.stock,
          createdAt: dateToString(updateBookStock.createdAt),
          updatedAt: dateToString(updateBookStock.updatedAt),
          },
          limitReturnTime: dateToString(getLoan.limitReturnTime)
        }
      } else throw({status:400, message: "Failed to Edit Loan"})
    }catch (e) {
      Logger.log(e)
      throw { status : e.status,message : e.message}
    }

  }

}
