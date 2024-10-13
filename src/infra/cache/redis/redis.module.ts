import { Module } from '@nestjs/common';
import { EnvModule } from '@/infra/env/env.module';
import { RedisCacheRepository } from './redis-cache-repository';
import { CacheRepository } from '../cache-repositor';
import { RedisService } from './redis.service';

@Module({
  imports: [EnvModule],
  providers: [RedisService,
    {
      provide: CacheRepository,
      useClass: RedisCacheRepository
    }
  ],
  exports: [CacheRepository]
})
export class CacheModule {}
