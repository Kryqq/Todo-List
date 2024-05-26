import { removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, tasksReducer } from './tasks-reducer';
import { v1 } from 'uuid';
import { TasksState } from '../../App';
import { addTodolistAC } from '../todolists-reducer/todolists-reducer';

test('correct task should be removed', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   const startState: TasksState = {
      [todolistId1]: [
         { id: v1(), title: 'HTML&CSS', isDone: false },
         { id: v1(), title: 'JS', isDone: false },
         { id: v1(), title: 'ReactJS', isDone: false },
         { id: v1(), title: 'Redux', isDone: false },
         { id: v1(), title: 'Typescript', isDone: false },
         { id: v1(), title: 'RTK query', isDone: false },
      ],
      [todolistId2]: [
         { id: v1(), title: 'Fruits', isDone: false },
         { id: v1(), title: 'Meat', isDone: false },
      ],
   };

   const theTask = startState[todolistId2][0].id;

   const endState = tasksReducer(startState, removeTaskAC(theTask, todolistId2));

   expect(endState[todolistId2].length).toBe(1);

   expect(endState).toEqual({
      [todolistId1]: startState[todolistId1],
      [todolistId2]: [{ id: startState[todolistId2][1].id, title: 'Meat', isDone: false }],
   });
});

test('correct task should be added', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   const startState: TasksState = {
      [todolistId1]: [
         { id: v1(), title: 'HTML&CSS', isDone: false },
         { id: v1(), title: 'JS', isDone: false },
         { id: v1(), title: 'ReactJS', isDone: false },
         { id: v1(), title: 'Redux', isDone: false },
         { id: v1(), title: 'Typescript', isDone: false },
         { id: v1(), title: 'RTK query', isDone: false },
      ],
      [todolistId2]: [
         { id: v1(), title: 'Fruits', isDone: false },
         { id: v1(), title: 'Meat', isDone: false },
      ],
   };
   const action = addTaskAC('New task', todolistId2);

   const endState = tasksReducer(startState, action);

   expect(endState[todolistId1].length).toBe(6);
   expect(endState[todolistId2].length).toBe(3);
   expect(endState[todolistId2][0].id).toBeDefined();
   expect(endState[todolistId2][0].title).toBe('New task');
   expect(endState[todolistId2][0].isDone).toBe(false);
});

test('correct status of task should be changed', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   const startState: TasksState = {
      [todolistId1]: [
         { id: v1(), title: 'HTML&CSS', isDone: false },
         { id: v1(), title: 'JS', isDone: false },
         { id: v1(), title: 'ReactJS', isDone: false },
         { id: v1(), title: 'Redux', isDone: false },
         { id: v1(), title: 'Typescript', isDone: false },
         { id: v1(), title: 'RTK query', isDone: false },
      ],
      [todolistId2]: [
         { id: v1(), title: 'Fruits', isDone: false },
         { id: v1(), title: 'Meat', isDone: false },
      ],
   };

   const endState = tasksReducer(startState, changeTaskStatusAC(todolistId2, startState[todolistId2][0].id, true));

   expect(endState[todolistId2][0].isDone).toBe(true);
});

test('correct task should change its name', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();
   const startState: TasksState = {
      [todolistId1]: [
         { id: v1(), title: 'HTML&CSS', isDone: false },
         { id: v1(), title: 'JS', isDone: false },
         { id: v1(), title: 'ReactJS', isDone: false },
         { id: v1(), title: 'Redux', isDone: false },
         { id: v1(), title: 'Typescript', isDone: false },
         { id: v1(), title: 'RTK query', isDone: false },
      ],
      [todolistId2]: [
         { id: v1(), title: 'Fruits', isDone: false },
         { id: v1(), title: 'Meat', isDone: false },
      ],
   };

   const endState = tasksReducer(
      startState,
      changeTaskTitleAC(todolistId2, startState[todolistId2][0].id, 'New TaskTitle')
   );
   expect(endState[todolistId2][0].title).toBe('New TaskTitle');
   expect(endState[todolistId2][1].title).toBe('Meat');
});

test('new array should be added when new todolist is added', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();
   const startState: TasksState = {
      [todolistId1]: [
         { id: v1(), title: 'HTML&CSS', isDone: false },
         { id: v1(), title: 'JS', isDone: false },
         { id: v1(), title: 'ReactJS', isDone: false },
         { id: v1(), title: 'Redux', isDone: false },
         { id: v1(), title: 'Typescript', isDone: false },
         { id: v1(), title: 'RTK query', isDone: false },
      ],
      [todolistId2]: [
         { id: v1(), title: 'Fruits', isDone: false },
         { id: v1(), title: 'Meat', isDone: false },
      ],
   };

   const action = addTodolistAC('new todolist');

   const endState = tasksReducer(startState, action);

   const keys = Object.keys(endState);
   const newKey = keys.find((k) => k != todolistId1 && k != todolistId2);
   if (!newKey) {
      throw Error('new key should be added');
   }

   expect(keys.length).toBe(3);
   expect(endState[newKey]).toEqual([]);
});



