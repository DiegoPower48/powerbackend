import { Module } from '@nestjs/common';
import { LoginService } from './usuarios.service';
import { LoginController } from './usuarios.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
