import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ConsumoEnergiaService } from './consumo_energia.service';
import { CreateConsumoDto } from './dto/create-consumo.dto';
import { QueryConsumoDto } from './dto/query-consumo.dto';

@Controller('consumo')
export class ConsumoEnergiaController {
  constructor(private readonly service: ConsumoEnergiaService) {}

  @Post()
  criar(@Body() dto: CreateConsumoDto) {
    return this.service.criar(dto);
  }

  // **O bulk deve estar exatamente assim:**
  @Post('bulk')
  bulkInsert(@Body() dtos: CreateConsumoDto[]) {
    return this.service.bulkInsert(dtos);
  }

  @Get()
  historico(@Query() query: QueryConsumoDto) {
    const { usuarioId, dataInicio, dataFim } = query;
    return this.service.historico(
      usuarioId,
      new Date(dataInicio),
      new Date(dataFim),
    );
  }

  @Get('alerta/:usuarioId')
  alerta(@Param('usuarioId') usuarioId: string) {
    return this.service.alerta(usuarioId);
  }
}
