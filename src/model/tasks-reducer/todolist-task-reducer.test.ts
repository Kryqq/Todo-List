import { v1 } from 'uuid';
import { TasksState, TodolistsType } from '../../App';

import { addTodolistAC, removeTodolistAC, todolistsReducer } from '../todolists-reducer/todolists-reducer';
import { tasksReducer } from './tasks-reducer';

test('ids should be equals', () => {
   const startTasksState: TasksState = {};
   const startTodolistsState: Array<TodolistsType> = [];

   const action = addTodolistAC('new todolist');

   const endTasksState = tasksReducer(startTasksState, action);
   const endTodolistsState = todolistsReducer(startTodolistsState, action);

   const keys = Object.keys(endTasksState);

   const idFromTasks = keys[0];
   const idFromTodolists = endTodolistsState[0].id;


   expect(idFromTasks).toBe(action.todolistId);
   expect(idFromTodolists).toBe(action.todolistId);

});

test('property with todolistId should be deleted', () => {
	const startState: TasksState = {
	   "todolistId1": [
		 { id: v1(), title: 'HTML&CSS', isDone: false },
		 { id: v1(), title: 'JS', isDone: false },
		 { id: v1(), title: 'ReactJS', isDone: false },
		 { id: v1(), title: 'Redux', isDone: false },
		 { id: v1(), title: 'Typescript', isDone: false },
		 { id: v1(), title: 'RTK query', isDone: false },
	   ],
	   "todolistId2": [
		 { id: v1(), title: 'Fruits', isDone: false },
		 { id: v1(), title: 'Meat', isDone: false },
	   ],
	};
  
	const action = removeTodolistAC('todolistId2');
  
	const endState = tasksReducer(startState, action);
  
	const keys = Object.keys(endState);
  
	expect(keys.length).toBe(1);
	expect(endState['todolistId2']).not.toBeDefined();
  });
  