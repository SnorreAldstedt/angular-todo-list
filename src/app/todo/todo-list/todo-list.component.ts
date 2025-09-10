import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  private readonly router = inject(Router);

  public todos$ = new Observable<Todo[]>();

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
    this.todos$.subscribe((todos) => {
      todos.forEach((todo) => {
        console.log(todo.title);
      });
    });
  }

  //todos = this.todoService.todos;

  refreshTodos(): void {
    this.todos$ = this.todoService.getTodos();
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe({
      next: (response) => {
        console.log('updated', response)
      }
    });
    //this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title).subscribe({
      next: (response) => {
        console.log('Todo added:', response)
        //this.router.navigate(['/']);
        this.refreshTodos();
      },
      error: (err) => {
        console.error('Failed to add todo:', err);
      }
    });
  }
}
