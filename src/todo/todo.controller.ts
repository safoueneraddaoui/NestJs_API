import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
//import { Request, Response } from 'express';

@Controller('todo')
export class TodoController {

  @Get()
  getTodo(
  ) {
    console.log('Get todo');
    return 'Todo List';
  }

  @Post()
  addTodo() {
    console.log('Add todo');
    return 'Add Todo';
  }

  @Delete()
  deleteTodo() {
    console.log('Delete todo');
    return 'Delete TODO'
  }

  @Put()
  updateTodo() {
    console.log('Update todo');
    return 'Update TODO'
  }

}
