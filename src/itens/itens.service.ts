import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemEntity } from './entities/item.entity';
import { CreateItemDTO } from './dtos/createItem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItensService {
    constructor(
        @InjectRepository(ItemEntity)
        private readonly itemRepository: Repository<ItemEntity> 
    ){}

    async findItemById(id: number): Promise<ItemEntity> {
        const itemFind = await this.itemRepository.findOne({
            where: {
                id: 4
            }
        });

        if(!itemFind) {
            throw new NotFoundException('Item não encontrado');
        }

        return itemFind;
    }

    async createItem(createItemDto: CreateItemDTO): Promise<ItemEntity> {
        return await this.itemRepository.save({
            ...createItemDto
        });
    }

    async findAllItens(): Promise<ItemEntity[]> {
        return await this.itemRepository.find();
    }

    async updateItem(item: ItemEntity): Promise<ItemEntity> {
        const itemFind = await this.findItemById(item.id);

        console.log(itemFind)

        return this.itemRepository.save({
            ...itemFind,
            descricao: item.descricao,
            preco: item.preco
        });
    }
}
