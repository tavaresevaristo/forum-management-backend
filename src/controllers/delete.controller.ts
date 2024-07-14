import { Controller, Delete } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// rota de apagar qualquer coisa que foi no banco de forma errada.

@Controller('/delete')
export class DeleteUsersController {
  constructor(private prisma: PrismaService) {}

  @Delete()
  async handle() {
    await this.prisma.question.delete({
      where: {
        id: 'ce52dd9a-6de2-441c-adaf-15180a52414c',
      },
    });
  }
}
