import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDTO } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { createPasswordHashed } from 'src/utils/password';
import { ReturnUserDTO } from './dtos/returnUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async createUser(userDto: CreateUserDTO): Promise<ReturnUserDTO> {
        const senhaCriptografada = await createPasswordHashed(userDto.senha);

        const usuario = new ReturnUserDTO(
            await this.userRepository.save({
                ...userDto,
                senha: senhaCriptografada
            })
        );

        return usuario;
    }

    async findAllUsers(): Promise<ReturnUserDTO[]> {
            const usuarios = await this.userRepository.find();

            if(!usuarios){
                throw new NotFoundException('Nenhum usuário foi encontrado');
            }

            const usuariosSemSenha = usuarios.map((user) => new ReturnUserDTO(user));

            return usuariosSemSenha;
    }

    async findUserById(idUser: number): Promise<ReturnUserDTO> {
        const usuario = await this.userRepository.findOne({
            where: {
                id: idUser
            }
        });

        if(!usuario) {
            throw new NotFoundException('Usuário não encontrado!');
        }

        const usuarioSemSenha = new ReturnUserDTO(usuario);

        return usuarioSemSenha;
    }

    async findUserByName(nameUser: string): Promise<UserEntity> {
        const usuario = await this.userRepository.findOne({
            where: {
                nome: nameUser
            }
        });

        if(!usuario) {
            throw new NotFoundException('Usuário não encontrado!');
        }

        return usuario;
    }

    async deleteUser(idUser: number): Promise<DeleteResult>{
        await this.findUserById(idUser);

        return await this.userRepository.delete({ id: idUser });
    }
}
