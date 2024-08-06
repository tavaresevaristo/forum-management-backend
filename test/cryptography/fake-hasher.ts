import { HashComparer } from '@/domain/forum/application/cyptography/hash-compare';
import { HashGenerator } from '@/domain/forum/application/cyptography/hash-generator';

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(hash: string): Promise<string> {
    return hash.concat('-hashed');
  }

  async compare(hash: string, plain: string): Promise<boolean> {
    return hash.concat('-hashed') === plain;
  }
}
