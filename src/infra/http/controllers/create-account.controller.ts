import {
  Body,
  Post,
  UsePipes,
  Controller,
  ConflictException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { CreateAccountBodySchema, createAccountBodySchema } from '../interface/rest/user.dto';


@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    const userAlreadyExist = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExist) {
      throw new ConflictException(
        'User with same email address already exists',
      );
    }

    const passwordHashed = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: passwordHashed,
      },
    });
  }
}
