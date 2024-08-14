import { instance } from 'common/instance/instance'
import { BaseResponse } from 'common/types/types'
import { TodolistType } from './todolistsAPI.types'

export const todolistsAPI = {
  getTodolists() {
    const promise = instance.get<TodolistType[]>('todo-lists')
    return promise
  },
  createTodolist(title: string) {
    const promise = instance.post<BaseResponse<{ item: TodolistType }>>('todo-lists', { title: title })
    return promise
  },
  deleteTodolist(id: string) {
    const promise = instance.delete<BaseResponse>(`todo-lists/${id}`)
    return promise
  },
  updateTodolist(id: string, title: string) {
    const promise = instance.put<BaseResponse>(`todo-lists/${id}`, { title: title })
    return promise
  },
}

