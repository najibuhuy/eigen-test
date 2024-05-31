import { Test, TestingModule } from '@nestjs/testing';
import { mongooseObjectId } from './libs/helper/mongoose.helper';
import { UserController } from './services/member/user.controller';
import { UserService } from './services/member/member.service';

describe('UserController', () => {
  let appController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    appController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      
      expect(appController.getProfile('test')).toBe('');
    });
  });
});
