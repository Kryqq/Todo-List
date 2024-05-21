import { addTodolistAC, changeTodolistFilterAC, removeTodolistAC, todolistsReducer } from './todolists-reducer';
import { v1 } from 'uuid';
import { TodolistsType } from '../App';

test('correct todolist should be removed', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   // 1. Стартовый state
   const startState: TodolistsType[] = [
      { id: todolistId1, title: 'What to learn', filter: 'all' },
      { id: todolistId2, title: 'What to buy', filter: 'all' },
   ];

   // 2. Действие

   const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

   // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
   // в массиве останется один тудулист
   expect(endState.length).toBe(1);
   // удалится нужный тудулист, а не любой
   expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   const startState: TodolistsType[] = [
      { id: todolistId1, title: 'What to learn', filter: 'all' },
      { id: todolistId2, title: 'What to buy', filter: 'all' },
   ];
   const newTitle = 'New Todolist';

   const endState = todolistsReducer(startState, addTodolistAC(newTitle));

   expect(endState.length).toBe(3);
   expect(endState[2].title).toBe(newTitle);
   expect(endState[2].filter).toBe('all');
});

test('correct filter of todolist should be changed', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   const startState: TodolistsType[] = [
      { id: todolistId1, title: 'What to learn', filter: 'all' },
      { id: todolistId2, title: 'What to buy', filter: 'all' },
   ];

   const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'completed'));

   expect(endState[0].filter).toBe('all');
   expect(endState[1].filter).toBe('completed');
});