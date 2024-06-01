import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { BookSchema } from 'src/schema/book.schema';

@Module({
  imports: [
    JwtModule.register({}), 
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'Book', schema: BookSchema },
      
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
