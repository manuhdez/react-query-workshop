export interface Todo {
  title: string;
  done: boolean;
}

export interface TodoRecord extends Todo {
  id: number;
}
