import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { EnvService } from './config/env.service';
import { ConfigModule } from '@nestjs/config';
import { OidcModule } from './oidc/oidc.module';

@Module({
  imports: [AuthModule, OidcModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, EnvService],
})
export class AppModule {}
