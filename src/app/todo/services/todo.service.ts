import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment.development';
import { Observable, lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [
    {
      id: this.todoId++,
      title: 'serve the app',
      completed: true,
    },
    {
      id: this.todoId++,
      title: 'familiarise yourself with the codebase',
      completed: false,
    },
    {
      id: this.todoId++,
      title: 'start talking to the api',
      completed: false,
    },
  ];

  private username = "snorre";

  private http = inject(HttpClient);

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}/${this.username}/todo`)
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    const foundTodo = this.findTodoById
    return this.http.put<Todo>(`${environment.apiUrl}/${this.username}/todo/${todo.id}`, todo)
  }

  public addTodo(title: string): Observable<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    }
    return this.http.post<Todo>(`${environment.apiUrl}/${this.username}/todo/`, todo)
  }

  public findTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${environment.apiUrl}/${this.username}/todo/${id}`)

  }

  // TODO replace with a get request
  todos: Observable<Todo[]> = this.getTodos();
}
