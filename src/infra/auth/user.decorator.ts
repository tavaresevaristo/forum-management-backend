import { payloadSchema } from './jwt.strategy';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDecorator = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as payloadSchema;
  },
);
