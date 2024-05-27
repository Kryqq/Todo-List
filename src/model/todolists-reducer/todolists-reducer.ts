import { FilterValuesType, TodolistsType } from '../../App';
import { v1 } from 'uuid';

let todolistID1 = v1();
let todolistID2 = v1();

export type RemoveTodolistActionType = {
   type: 'REMOVE-TODOLIST';

   id: string;
};

export type AddTodolistActionType = {
   type: 'ADD-TODOLIST';
   todolistId: string;
   title: string;
};

export type ChangeTodolistFilterActionType = {
   type: 'CHANGE-TODOLIST-FILTER';

   filter: FilterValuesType;
   todolistId: string;
};

export type ChangeTodolistTitleActionType = {
   type: 'CHANGE-TODOLIST-TITLE';

   id: string;
   title: string;
};
export type ActionsType =
   | RemoveTodolistActionType
   | AddTodolistActionType
   | ChangeTodolistFilterActionType
   | ChangeTodolistTitleActionType;

const initialState: TodolistsType[] = [
   { id: todolistID1, title: 'What to learn', filter: 'all' },
   { id: todolistID2, title: 'What to buy', filter: 'all' },
];

export const todolistsReducer = (state: TodolistsType[] = initialState, action: ActionsType): TodolistsType[] => {
   switch (action.type) {
      case 'REMOVE-TODOLIST': {
         return state.filter((tl) => tl.id !== action.id);
      }
      case 'ADD-TODOLIST': {
         return [...state, { id: action.todolistId, title: action.title, filter: 'all' }];
      }
      case 'CHANGE-TODOLIST-FILTER': {
         return state.map((tl) => (tl.id === action.todolistId ? { ...tl, filter: action.filter } : tl));
      }
      case 'CHANGE-TODOLIST-TITLE': {
         return state.map((tl) => (tl.id === action.id ? { ...tl, title: action.title } : tl));
      }
      default:
         throw new Error("I don't understand this type");
   }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
   return {
      type: 'REMOVE-TODOLIST',

      id: todolistId,
   } as const;
};
export const addTodolistAC = (title: string): AddTodolistActionType => {
   return {
      type: 'ADD-TODOLIST',
      todolistId: v1(),
      title,
   } as const;
};

export const changeTodolistFilterAC = (
   todolistId: string,
   filter: FilterValuesType
): ChangeTodolistFilterActionType => {
   return {
      type: 'CHANGE-TODOLIST-FILTER',

      filter,
      todolistId,
   } as const;
};

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
   return {
      type: 'CHANGE-TODOLIST-TITLE',

      id,
      title,
   } as const;
};
