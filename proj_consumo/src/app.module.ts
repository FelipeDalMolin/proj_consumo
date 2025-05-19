import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumoEnergiaModule } from './consumo_energia/consumo_energia.module';

@Module({
  imports: [
    // Serve a pasta public/ na raiz
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:senha1234@proj-cunsumo.4qefnki.mongodb.net/energia?retryWrites=true&w=majority&appName=proj-cunsumo',
    ),
    ConsumoEnergiaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
