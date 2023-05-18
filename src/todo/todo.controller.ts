import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';

@Controller('user/:userId/todo')
export class TodoController {
  private todos: { [userId: number]: Todo[] } = {};

  @Get()
  findAll(@Param('userId') userId: number): Todo[] {
    return this.todos[userId] || [];
  }

  @Get(':id')
  findById(@Param('userId') userId: number, @Param('id') id: number): any {
    const userTodos = this.todos[userId];
    if (userTodos) {
      const todoIndex = userTodos.findIndex((todo) => todo.id == id);
      if (todoIndex >= 0) {
        return userTodos[todoIndex];
      }
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  create(@Param('userId') userId: number, @Body() todo: Todo): any {
    if (!this.todos[userId]) {
      this.todos[userId] = [];
    }
    this.todos[userId].push(todo);
    return {
      message: 'Todo Created!',
    };
  }

  @Put(':id')
  update(
    @Param('userId') userId: number,
    @Param('id') id: number,
    @Body() updatedTodo: Todo,
  ): any {
    const userTodos = this.todos[userId];
    if (userTodos) {
      const todoIndex = userTodos.findIndex((todo) => todo.id == id);
      if (todoIndex >= 0) {
        userTodos[todoIndex] = { ...userTodos[todoIndex], ...updatedTodo };
        return {
          message: `Todo with id of ${id} Updated!`,
        };
      }
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  delete(@Param('userId') userId: number, @Param('id') id: number): any {
    const userTodos = this.todos[userId];
    if (userTodos) {
      const todoIndex = userTodos.findIndex((todo) => todo.id == id);
      if (todoIndex >= 0) {
        userTodos.splice(todoIndex, 1);
        return {
          message: `Todo with id of ${id} Updated!`,
        };
      }
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }
}
