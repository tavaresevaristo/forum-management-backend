import Redis from 'ioredis';
import { OnModuleDestroy } from '@nestjs/common';
import { EnvService } from '@/infra/env/env-service';

export class RedisService extends Redis implements OnModuleDestroy {
  constructor(envService: EnvService) {
    super({
      host: envService.get('REDIS_HOST'),
      port: parseInt(envService.get('REDIS_PORT')),
      db: parseInt(envService.get('REDIS_DB')),
    });
  }

  onModuleDestroy() {
    return this.disconnect();
  }
}
