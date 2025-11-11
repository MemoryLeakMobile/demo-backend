import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './modules/orm.module';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [OrmModule, UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, Logger],
})
export class AppModule {}
