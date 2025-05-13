import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateConsumoDto {
  @IsString()
  usuarioId: string;

  @IsNumber()
  quantidade: number;

  @IsDateString()
  dataLeitura: string;
}