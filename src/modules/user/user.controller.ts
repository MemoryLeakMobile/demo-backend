import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EntityRepository, QueryOrder, wrap, EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../../entities/User';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User) private readonly UserRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) { }

  @Get()
  async find() {
    return await this.UserRepository.findAll({
      populate: ['name', 'age'],
      orderBy: { name: QueryOrder.DESC },
      limit: 20,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.UserRepository.findOneOrFail(id, {
      populate: ['name', 'age'],
    });
  }

  @Post()
  async create(@Body() body: any) {
    if (!body.name || !body.age) {
      throw new HttpException('One of `name, age` is missing', HttpStatus.BAD_REQUEST);
    }

    const User = this.UserRepository.create(body);
    await this.em.flush();

    return User;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const User = await this.UserRepository.findOneOrFail(id);
    wrap(User).assign(body);
    await this.em.flush();

    return User;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const User = await this.UserRepository.findOneOrFail(id);
    this.em.remove(User);
    await this.em.flush();
  }
}