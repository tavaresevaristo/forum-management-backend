import {
  Body,
  Post,
  UsePipes,
  Controller,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';

const createAccountBodySchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
  .required();

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

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

    const hashedPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
