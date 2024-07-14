import { Controller, Delete } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/delete')
export class DeleteUsersController {
  constructor(private prisma: PrismaService) {}

  @Delete()
  async handle() {
    await this.prisma.user.deleteMany({});
  }
}
