import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ItensService } from './itens.service';
import { ItemEntity } from './entities/item.entity';
import { ItemDTO } from './dtos/item.dto';
import { DeleteResult } from 'typeorm';

@Controller('itens')
export class ItensController {
  constructor(private readonly itensService: ItensService) {}
  
  @Post()
  async createItem(@Body() createItemDto: ItemDTO): Promise<ItemEntity> {
    return this.itensService.createItem(createItemDto);
  }     

  @Get()
  async findAllItens(): Promise<ItemEntity[]> {
    return this.itensService.findAllItens();
  }

  @Patch(':id')
  async updateItem(@Param('id') id: number, @Body() item: ItemDTO): Promise<ItemEntity> {
    return this.itensService.updateItem(id, item);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: number): Promise<DeleteResult> {
    return this.itensService.deleteItem(id);
  }
}
