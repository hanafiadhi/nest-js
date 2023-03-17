import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [AuthModule, PrismaModule, CustomerModule],
})
export class AppModule {}
