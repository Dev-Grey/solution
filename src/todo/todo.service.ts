import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: { [userId: number]: Todo[] } = {};

  findAll(userId: number): Todo[] {
    return this.todos[userId] || [];
  }

  findById(userId: number, id: number): Todo {
    const userTodos = this.todos[userId];
    if (userTodos) {
      const todoIndex = userTodos.findIndex((todo) => todo.id == id);
      if (todoIndex >= 0) {
        return userTodos[todoIndex];
      }
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  create(userId: number, todo: Todo): any {
    if (!this.todos[userId]) {
      this.todos[userId] = [];
    }
    this.todos[userId].push(todo);
    return {
      message: 'Todo Created!',
    };
  }

  update(userId: number, id: number, updatedTodo: Todo): any {
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

  delete(userId: number, id: number): any {
    const userTodos = this.todos[userId];
    if (userTodos) {
      const todoIndex = userTodos.findIndex((todo) => todo.id == id);
      if (todoIndex >= 0) {
        userTodos.splice(todoIndex, 1);
        return {
          message: `Todo with id of ${id} Deleted!`,
        };
      }
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }
}
