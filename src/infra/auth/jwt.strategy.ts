import { z } from 'zod';
import { Injectable } from '@nestjs/common';
import { EnvService } from '../env/env-service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const payloadSchema = z.object({
  sub: z.string().uuid(),
});

export type payloadSchema = z.infer<typeof payloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
  const publicKey = env.get('JWT_PUBLIC_KEY');

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
