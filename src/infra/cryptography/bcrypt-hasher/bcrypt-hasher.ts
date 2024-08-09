import { hash, compare } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { HashComparer } from '@/domain/forum/application/cyptography/hash-compare';
import { HashGenerator } from '@/domain/forum/application/cyptography/hash-generator';

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
