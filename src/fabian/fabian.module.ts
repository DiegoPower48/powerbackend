import { Module } from '@nestjs/common';
import { LoginModule } from './usuarios/usuarios.module';


@Module({
  imports: [LoginModule],
})
export class FabianModule {}
