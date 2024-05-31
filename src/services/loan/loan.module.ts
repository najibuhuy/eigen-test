import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from 'src/schema/member.schema';
import { LoanSchema } from 'src/schema/loan.schema';

import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Member', schema: MemberSchema },
      { name: 'Loan', schema: LoanSchema },
    ]),
  ],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
