import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/createUser.dto';
import { ReturnUserDTO } from './dtos/returnUser.dto';
import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDTO): Promise<ReturnUserDTO> {
    return this.userService.createUser(user);
  }

  @Get()
  async findAllUsers(): Promise<ReturnUserDTO[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id', ParseIntPipe) id: number): Promise<ReturnUserDTO> {
    return this.userService.findUserById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
