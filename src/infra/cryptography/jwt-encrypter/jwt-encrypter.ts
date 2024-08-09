import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Encrypter } from '@/domain/forum/application/cyptography/encrypter';

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
