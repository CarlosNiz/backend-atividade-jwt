import { Controller } from '@nestjs/common';
import { ItensService } from './itens.service';

@Controller('itens')
export class ItensController {
  constructor(private readonly itensService: ItensService) {}
}
