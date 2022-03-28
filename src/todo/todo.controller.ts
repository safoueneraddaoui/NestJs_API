import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Console } from 'console';
import { Todo } from './entity/todo.entity';
//import { Request, Response } from 'express';


@Controller('todo')
export class TodoController {
  constructor() {
    this.todo = []
  }
  todo: Todo[];

  @Get()
  getTodo(
    @Query() mesQueryParam
  ) {
    console.log(mesQueryParam)
    return this.todo;
  }

  @Get('/:id')
  getTodoById(
    @Param('id') id
  ) {
    const todo = this.todo.find((actualTodo) => actualTodo.id === +id);
    if (todo)
      return todo;
    throw new NotFoundException(`Todo Not Found`)
  }

  @Post()
  addTodo(
    @Body() newTodo: Todo,
  ) {
    //console.log('Add todo');
    if (this.todo.length) {
      newTodo.id = this.todo[this.todo.length - 1].id + 1
    }
    else {
      newTodo.id = 1
    }
    this.todo.push(newTodo)
    return newTodo
  }

  @Delete(':id')
  deleteTodo(
    @Param('id') id
  ) {
    // Search object using id
    const index = this.todo.findIndex((todo: Todo) => todo.id === +id);
    // Using Slice to delete todo
    if (index >= 0) {
      this.todo.splice(index, 1);
    } else {
      throw new NotFoundException(`Not found id ${id}`)
    }
    return {
      message: `Deleted id ${id}`,
      count: 1
    }
  }

  @Put(':id')
  updateTodo(
    @Param('id') id,
    @Body() newTodo:Partial<Todo>
  ) {
    const todo = this.getTodoById(id);
    todo.desc = newTodo.desc? newTodo.desc : todo.desc;
    todo.name = newTodo.name? newTodo.name : todo.name;

    return todo
  }

}
