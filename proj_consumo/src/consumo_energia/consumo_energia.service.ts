import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consumo, ConsumoDocument } from './consumo_energia.model';
import { CreateConsumoDto } from './dto/create-consumo.dto';

@Injectable()
export class ConsumoEnergiaService {
  constructor(
    @InjectModel(Consumo.name) private consumoModel: Model<ConsumoDocument>,
  ) {}

  // 1. Registro do consumo
  async criar(dto: CreateConsumoDto): Promise<Consumo> {
    const registro = new this.consumoModel({
      ...dto,
      dataLeitura: new Date(dto.dataLeitura),
    });
    return registro.save();
  }

  // 2. Histórico entre datas
  async historico(usuarioId: string, inicio: Date, fim: Date): Promise<Consumo[]> {
    return this.consumoModel
      .find({ usuarioId, dataLeitura: { $gte: inicio, $lte: fim } })
      .sort({ dataLeitura: 1 })
      .exec();
  }

  // 3. Alerta de consumo elevado
  async alerta(usuarioId: string): Promise<{ alerta: boolean; diferenca: number }> {
    const registros = await this.consumoModel
      .find({ usuarioId })
      .sort({ dataLeitura: -1 })
      .limit(2)
      .exec();

    if (registros.length < 2) {
      throw new BadRequestException(
        'São necessários ao menos 2 meses de registros',
      );
    }
    const [atual, anterior] = registros;
    const diferenca = atual.quantidade - anterior.quantidade;
    return { alerta: diferenca > 0, diferenca };
  }

  // 4. Bulk insert
  async bulkInsert(dtos: CreateConsumoDto[]): Promise<Consumo[]> {
    const registros = dtos.map(dto => ({
      ...dto,
      dataLeitura: new Date(dto.dataLeitura),
    }));
    return this.consumoModel.insertMany(registros);
  }
}