import { z } from 'zod';
import { ENV } from 'src/env';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const payloadSchema = z.object({
  sub: z.string().uuid(),
});

export type payloadSchema = z.infer<typeof payloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<ENV, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true });

    super({
      algorithms: ['RS256'],
      secretOrKey: Buffer.from(publicKey, 'base64'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: payloadSchema) {
    return payloadSchema.parse(payload);
  }
}
