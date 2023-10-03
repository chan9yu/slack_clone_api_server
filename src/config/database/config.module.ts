import { Module } from '@nestjs/common';

import { MariaDBConfigService } from './config.service';

@Module({
	providers: [MariaDBConfigService]
})
export class MariaDBConfigModule {}
