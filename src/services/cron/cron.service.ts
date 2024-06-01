import {Injectable, Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Cron, CronExpression} from '@nestjs/schedule';
import { Model } from 'mongoose';
import { addDate, dateNowDayjs, differentDay, isAfterDate, substractDateType } from 'src/libs/helper/dayjs.helper';
import { dateToString } from 'src/libs/helper/global.helper';
import { Loan } from 'src/schema/loan.schema';
import { Member } from 'src/schema/member.schema';

@Injectable()
export class CronService {
    constructor(
        @InjectModel('Loan') private LoanModel: Model<Loan>,
        @InjectModel('Member') private MemberModel: Model<Member>
    ) {
    }

    private readonly logger = new Logger(CronService.name)

    @Cron(CronExpression.EVERY_5_MINUTES, {name: 'Suspend Member after seven days borrowed the book'})
    async suspendMemberAfterSevenDays() {
        this.logger.log('Suspend Member after seven days borrowed the book')
        //get loan, check the limit time
        const getLoanLimitTime = await this.LoanModel.find({})
        if(!getLoanLimitTime.length){
            this.logger.log('No Loan')
        } else {
            for(const dtLoan of getLoanLimitTime){
                const limitTime = dtLoan.limitReturnTime
                const isMoreThanSevernDays = isAfterDate(dateToString(new Date()),  dateToString(limitTime))
                if(isMoreThanSevernDays) {
                    //update isSuspended = true
                    await this.MemberModel.findByIdAndUpdate(
                        {_id: dtLoan.bookBorrower._id},
                        {
                            isSuspended: true, 
                            suspendTime: addDate(dateToString(new Date()), 3, substractDateType.DAY )},
                    )
                } else continue
            }
        }

       
       
    }

    
    @Cron(CronExpression.EVERY_5_MINUTES, {name: 'Update member isSuspended = false, after 3 days'})
    async returnAllowCanBorrow(){
        this.logger.log('Update member isSuspended = false, after 3 days')

        //check suspendTime > dateNow() => update to isSuspended = false
        const getMemberIsSuspended = await this.MemberModel.find({
            isSuspended: true
        })
        if(!getMemberIsSuspended.length) {
            this.logger.log('No Member got Suspended')
        } else {
            for(const dtSuspended of getMemberIsSuspended) {
                const suspendTimeUntil = dtSuspended.suspendTime
                const afterThreeDays = isAfterDate(dateToString(suspendTimeUntil), dateToString(new Date()))
                if(afterThreeDays) {
                    await this.MemberModel.findByIdAndUpdate(
                        {
                            _id: dtSuspended._id
                        },  
                        {isSuspended: false}
                    )
                }
            }
        }
        
    }
}