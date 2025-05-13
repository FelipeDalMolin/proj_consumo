import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConsumoDocument = Consumo & Document;

@Schema()
export class Consumo {
  @Prop({ required: true })
  usuarioId: string;

  @Prop({ required: true })
  quantidade: number;

  @Prop({ required: true })
  dataLeitura: Date;
}

export const ConsumoSchema = SchemaFactory.createForClass(Consumo);
