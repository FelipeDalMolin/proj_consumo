import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumoEnergiaModule } from './consumo_energia/consumo_energia.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:senha1234@proj-cunsumo.4qefnki.mongodb.net/energia?retryWrites=true&w=majority&appName=proj-cunsumo',
    ),
    ConsumoEnergiaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}