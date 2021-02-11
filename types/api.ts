import { TodoRecord } from 'types/todo';

interface Response<T> {
  data: T;
  status: number;
}

export type GetTodosResPonse = Response<TodoRecord[]>;
export type PostTodoResponse = Response<TodoRecord>;
export type UpdateTodoResponse = Response<TodoRecord>;
