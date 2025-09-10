import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  @Output('newTodo') newTodo = new EventEmitter<string>();

  todo: string = '';

  //private router = inject(Router)
  //private readonly todoService: TodoService;

  //constructor(private readonly service: TodoService){ this.todoService = service;}

  submit() {
    this.newTodo.emit(this.todo);
  }
}
