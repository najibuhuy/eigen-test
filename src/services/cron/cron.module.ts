import {Module} from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from 'src/schema/member.schema';
import { LoanSchema } from 'src/schema/loan.schema';
import { BookSchema } from 'src/schema/book.schema';
import { CronService } from './cron.service';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        MongooseModule.forFeature([
            { name: 'Member', schema: MemberSchema },
            { name: 'Loan', schema: LoanSchema },
            { name: 'Book', schema: BookSchema },
          ]),
    ],
    providers: [
        CronService
    ],
})
export class CronModule {
}