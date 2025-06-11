import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemEntity } from './entities/item.entity';
import { ItemDTO } from './dtos/item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ItensService {
    constructor(
        @InjectRepository(ItemEntity)
        private readonly itemRepository: Repository<ItemEntity> 
    ){}

    async findItemById(id: number): Promise<ItemEntity> {
        const itemFind = await this.itemRepository.findOne({
            where: {
                id: id
            }
        });

        if(!itemFind) {
            throw new NotFoundException('Item não encontrado');
        }

        return itemFind;
    }

    async createItem(createItemDto: ItemDTO): Promise<ItemEntity> {
        return await this.itemRepository.save({
            ...createItemDto
        });
    }

    async findAllItens(): Promise<ItemEntity[]> {
        return await this.itemRepository.find();
    }

    async updateItem(id: number, item: ItemDTO): Promise<ItemEntity> {
        const itemFind = await this.findItemById(id);

        return this.itemRepository.save({
            ...itemFind,
            descricao: item.descricao,
            preco: item.preco
        });
    }

    async deleteItem(idItem: number): Promise<DeleteResult> {
        await this.findItemById(idItem);

        return await this.itemRepository.delete({ id: idItem });
    }
}
