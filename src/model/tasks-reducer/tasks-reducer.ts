import { TasksState, TodolistsType } from '../../App';
import { v1 } from 'uuid';

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

type RemoveTaskActionType = {
   type: 'REMOVE-TASK';
   payload: {
      taskId: string;
      todolistId: string;
   };
};

type AddTaskActionType = {
   type: 'ADD-TASK';
   payload: {
      newTitle: string;
      todolistId: string;
   };
};

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

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType;

export const tasksReducer = (state: TasksState = initialState, action: ActionsType): TasksState => {
   switch (action.type) {
      case 'REMOVE-TASK': {
         return {
            ...state,

            [action.payload.todolistId]: state[action.payload.todolistId].filter(
               (task) => task.id !== action.payload.taskId
            ),
         };
      }
      case 'ADD-TASK': {
         return {
            ...state,
            [action.payload.todolistId]: [
               ...state[action.payload.todolistId],
               { id: v1(), title: action.payload.newTitle, isDone: false },
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
      default:
         throw new Error("I don't understand this type");
   }
};

// removeTask, addTask, changeTaskStatus, changeTaskTitle,

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
   return {
      type: 'REMOVE-TASK',
      payload: {
         taskId,
         todolistId,
      },
   } as const;
};

export const addTaskAC = (newTitle: string, todolistId: string): AddTaskActionType => {
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
