import { TasksState } from '../../App';
import { v1 } from 'uuid';
import {
   AddTodolistActionType,
   RemoveTodolistActionType,
   todolistId1,
   todolistId2,
} from '../todolists-reducer/todolists-reducer';

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

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

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
            [action.todolistId]: [{ id: v1(), title: action.newTitle, isDone: false }, ...state[action.todolistId]],
         };
      }
      case 'CHANGE-TASK-STATUS': {
         return {
            ...state,
            [action.todolistId]: state[action.todolistId].map((task) =>
               task.id === action.taskId ? { ...task, isDone: action.newStatusValue } : task
            ),
         };
      }

      case 'CHANGE-TASK-TITLE': {
         return {
            ...state,
            [action.todolistId]: state[action.todolistId].map((task) =>
               task.id === action.taskId ? { ...task, title: action.newTitle } : task
            ),
         };
      }
      case 'ADD-TODOLIST': {
         return { ...state, [action.todolistId]: [] };
      }
      case 'REMOVE-TODOLIST': {
         const {
            [action.id]: [],
            ...rest
         } = state;

         return rest;
      }

      default:
         return state;
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
      newTitle,
      todolistId,
   } as const;
};
export const changeTaskStatusAC = (taskId: string, newStatusValue: boolean, todolistId: string) => {
   return { type: 'CHANGE-TASK-STATUS', todolistId, taskId, newStatusValue } as const;
};

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
   return { type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTitle } as const;
};
