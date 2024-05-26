import { TasksState } from '../../App';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType } from '../todolists-reducer/todolists-reducer';

const todolistId1 = v1();
const todolistId2 = v1();

const initialState: TasksState = {
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

//без payload!!!
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;

export type AddTaskActionType = ReturnType<typeof addTaskAC>;

type ChangeTaskStatusActionType = {
   type: 'CHANGE-TASK-STATUS';
   payload: {
      todolistId: string;
      taskId: string;
      newStatusValue: boolean;
   };
};

type ChangeTaskTitleActionType = {
   type: 'CHANGE-TASK-TITLE';
   payload: {
      todolistId: string;
      taskId: string;
      newTitle: string;
   };
};

type ActionsType =
   | RemoveTaskActionType
   | AddTaskActionType
   | ChangeTaskStatusActionType
   | ChangeTaskTitleActionType
   | AddTodolistActionType
   | RemoveTodolistActionType;

export const tasksReducer = (state: TasksState = initialState, action: ActionsType): TasksState => {
   switch (action.type) {
      case 'REMOVE-TASK': {
         return {
            ...state,

            [action.todolistId]: state[action.todolistId].filter((task) => task.id !== action.taskId),
         };
      }
      case 'ADD-TASK': {
         return {
            ...state,
            [action.payload.todolistId]: [
               { id: v1(), title: action.payload.newTitle, isDone: false },
               ...state[action.payload.todolistId],
            ],
         };
      }
      case 'CHANGE-TASK-STATUS': {
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].map((task) =>
               task.id === action.payload.taskId ? { ...task, isDone: action.payload.newStatusValue } : task
            ),
         };
      }

      case 'CHANGE-TASK-TITLE': {
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].map((task) =>
               task.id === action.payload.taskId ? { ...task, title: action.payload.newTitle } : task
            ),
         };
      }
      case 'ADD-TODOLIST': {
         return { ...state, [action.todolistId]: [] };
      }
      case 'REMOVE-TODOLIST': {
      

         const {
            [action.payload.id]: [],...rest } = state;

         return rest;
      }

      default:
         throw new Error("I don't understand this type");
   }
};

// removeTask, addTask, changeTaskStatus, changeTaskTitle,

//без payload!!!
export const removeTaskAC = (taskId: string, todolistId: string) => {
   return {
      type: 'REMOVE-TASK',
      taskId,
      todolistId,
   } as const;
};

export const addTaskAC = (newTitle: string, todolistId: string) => {
   return {
      type: 'ADD-TASK',
      payload: {
         newTitle,
         todolistId,
      },
   } as const;
};
export const changeTaskStatusAC = (
   todolistId: string,
   taskId: string,
   newStatusValue: boolean
): ChangeTaskStatusActionType => {
   return { type: 'CHANGE-TASK-STATUS', payload: { todolistId, taskId, newStatusValue } } as const;
};

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
   return { type: 'CHANGE-TASK-TITLE', payload: { todolistId, taskId, newTitle } } as const;
};
