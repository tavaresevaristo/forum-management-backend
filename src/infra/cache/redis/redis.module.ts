import { Module } from '@nestjs/common';
import { EnvService } from '@/infra/env/env-service';
import { EnvModule } from '@/infra/env/env.module';

@Module({
  imports: [EnvModule],
  providers: [EnvService],
})
export class CacheModule {}
