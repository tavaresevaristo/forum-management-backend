import {
  Body,
  Post,
  UsePipes,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';

import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { AuthenticateBodySchema, authenticateBodySchema } from '../interface/rest/auth.dto';


@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('user credentials do not match');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('user credentials do not match');
    }

    const acessToken = this.jwt.sign({ sub: user.id });
    return {
      user,
      access_token: acessToken,
    };
  }
}
