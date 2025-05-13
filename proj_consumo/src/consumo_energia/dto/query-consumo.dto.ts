import { IsString, IsDateString } from 'class-validator';

export class QueryConsumoDto {
  @IsString()
  usuarioId: string;

  @IsDateString()
  dataInicio: string;

  @IsDateString()
  dataFim: string;
}