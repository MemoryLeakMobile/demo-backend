import { Module } from '@nestjs/common';
import { OrmModule } from '../orm.module';
import { UserController } from './user.controller';

@Module({
  imports: [OrmModule],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}