import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Controller('user/:userId/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  findAll(@Param('userId') userId: number): Todo[] {
    return this.todoService.findAll(userId);
  }

  @Get(':id')
  findById(@Param('userId') userId: number, @Param('id') id: number): any {
    return this.todoService.findById(userId, id);
  }

  @Post()
  create(@Param('userId') userId: number, @Body() todo: Todo): any {
    return this.todoService.create(userId, todo);
  }

  @Put(':id')
  update(
    @Param('userId') userId: number,
    @Param('id') id: number,
    @Body() updatedTodo: Todo,
  ): any {
    return this.todoService.update(userId, id, updatedTodo);
  }

  @Delete(':id')
  delete(@Param('userId') userId: number, @Param('id') id: number): any {
    return this.todoService.delete(userId, id);
  }
}
