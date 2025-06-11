import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ItensService } from './itens.service';
import { ItemEntity } from './entities/item.entity';
import { CreateItemDTO } from './dtos/createItem.dto';

@Controller('itens')
export class ItensController {
  constructor(private readonly itensService: ItensService) {}
  
  @Post()
  async createItem(@Body() createItemDto: CreateItemDTO): Promise<ItemEntity> {
    return await this.itensService.createItem(createItemDto);
  }     

  @Get()
  async findAllItens(): Promise<ItemEntity[]> {
    return await this.itensService.findAllItens();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ItemEntity> {
    return await this.itensService.findItemById(id);
  }

  @Patch()
  async updateItem(@Body() item: ItemEntity): Promise<ItemEntity> {
    return await this.itensService.updateItem(item);
  }
}
