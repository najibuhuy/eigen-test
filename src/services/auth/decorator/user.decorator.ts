import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const GetMember = createParamDecorator(
  (
    data: string | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx
      .switchToHttp()
      .getRequest();
    if (data) {
      return request.member[data];
    }
    return request.member;
  },
);
