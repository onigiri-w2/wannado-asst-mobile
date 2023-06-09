import {repoWannado} from '@/domain/config';

import {TodoSerialized, Todo} from '../model/entity/todo';
import {CharId} from '../model/valueobjects/charId';
import {NotFoundTodo, NotFoundWannado} from '../utlis/exception';

export async function createTodo(
  wanandoId: string,
  title: string,
): Promise<TodoSerialized | undefined> {
  const wannado = await repoWannado.find(new CharId(wanandoId));
  if (!wannado) throw new NotFoundWannado();

  const todo = Todo.new(title);
  wannado.todoList.addTodo(todo);
  repoWannado.update(wannado);
  return todo.serialize();
}

export async function updateTodoTitle(
  wanandoId: string,
  todoId: string,
  title: string,
) {
  const wannado = await repoWannado.find(new CharId(wanandoId));
  if (!wannado) throw new NotFoundWannado();

  const todo = wannado.todoList.todos.find(todo => todo.id.id === todoId);
  if (!todo) throw new NotFoundTodo();

  todo.updateTitle(title);
  repoWannado.update(wannado);
}

export async function completeTodo(wannadoId: string, todoId: string) {
  const wannado = await repoWannado.find(new CharId(wannadoId));
  if (!wannado) throw new NotFoundWannado();

  const todo = wannado.todoList.complementTodoById(new CharId(todoId));
  if (!todo) throw new NotFoundTodo();

  repoWannado.update(wannado);
  return todo.serialize();
}

export async function uncompleteTodo(wanandoId: string, todoId: string) {
  const wannado = await repoWannado.find(new CharId(wanandoId));
  if (!wannado) throw new NotFoundWannado();

  const todo = wannado.todoList.uncomplementTodoById(new CharId(todoId));
  if (!todo) throw new NotFoundTodo();

  repoWannado.update(wannado);
  return todo.serialize();
}

export async function deleteTodo(
  wannadoId: string,
  todoId: string,
): Promise<void> {
  const wannado = await repoWannado.find(new CharId(wannadoId));
  if (!wannado) throw new NotFoundWannado();

  wannado.todoList.removeTodo(new CharId(todoId));
  repoWannado.update(wannado);
}

export async function reorder(
  wannadoId: string,
  todoOrder: string[],
): Promise<void> {
  const wannado = await repoWannado.find(new CharId(wannadoId));
  if (!wannado) throw new NotFoundWannado();

  const todoList = wannado.todoList;
  todoList.reorderUncomplementedTodoOrder(todoOrder.map(id => new CharId(id)));
  repoWannado.update(wannado);
}
