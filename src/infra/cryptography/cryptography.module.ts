import { Module } from '@nestjs/common';
import { JwtEncrypter } from './jwt-encrypter/jwt-encrypter';
import { BcryptHasher } from './bcrypt-hasher/bcrypt-hasher';

import { Encrypter } from '@/domain/forum/application/cyptography/encrypter';
import { HashComparer } from '@/domain/forum/application/cyptography/hash-compare';
import { HashGenerator } from '@/domain/forum/application/cyptography/hash-generator';

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HashGenerator, HashComparer],
})
export class CryptographyModule {}
