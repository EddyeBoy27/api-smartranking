import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogadot.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarJogador(@Body() criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criaJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
  }

  @Get()
  async consultaJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  @UsePipes(ValidationPipe)
  async consultaJogadorPeloId(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<Jogador> {
    return await this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Delete('/:_id')
  @UsePipes(ValidationPipe)
  async deletarJogador(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<void> {
    await this.jogadoresService.deletarJogador(_id);
  }
}
