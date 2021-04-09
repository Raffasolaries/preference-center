import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, SimplifiedUserDTO } from './dto/user.dto';
import { AllExceptionsFilter } from '../filters/all-exceptions.filter';
//import { User } from './decorators/user.decorator';
//import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @UseFilters(AllExceptionsFilter)
  async create(@Body() dto: UserDTO): Promise<UserDTO> {
   // console.log(typeof dto.toEntity());
   return await this.usersService.create(dto)
    .catch(err => {
     throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
    });
  }

  @Get()
  async findAll(): Promise<UserDTO[]> {
   return await this.usersService.findAll()
    .catch(err => {
     throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDTO> {
   return await this.usersService.findOne(id)
    .catch(err => {
     throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
    });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
   return await this.usersService.remove(id)
    .catch(err => {
     throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
    });
  }
}
