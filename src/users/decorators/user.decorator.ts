import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ConsentType } from '../../events/entities/event.entity';

interface Consent {
 id: ConsentType;
 enabled: boolean;
}

export interface User {
 id: string;
 email: string;
 consents: Consent[]
}
// export const User = (...args: string[]) => SetMetadata('user', args);

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: User = request.user;

    return data ? user?.[data] : user;
  },
);