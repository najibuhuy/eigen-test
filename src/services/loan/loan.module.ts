import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from 'src/schema/member.schema';
import { LoanSchema } from 'src/schema/loan.schema';

import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { BookSchema } from 'src/schema/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Member', schema: MemberSchema },
      { name: 'Loan', schema: LoanSchema },
      { name: 'Book', schema: BookSchema },

    ]),
  ],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
