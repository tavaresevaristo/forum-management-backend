import Redis from 'ioredis';
import { EnvService } from '@/infra/env/env-service';
import { Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
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
