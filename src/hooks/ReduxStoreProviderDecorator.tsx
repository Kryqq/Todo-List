import { Provider } from 'react-redux';
import { AppRootStateType } from '../model/redux/store/store';
import { combineReducers, createStore } from 'redux';
import { tasksReducer } from '../model/tasks-reducer/tasks-reducer';
import { todolistsReducer } from '../model/todolists-reducer/todolists-reducer';
import { v1 } from 'uuid';

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
});

const initialGlobalState = {
   todolists: [
      { id: 'todolistId1', title: 'What to learn', filter: 'all' },
      { id: 'todolistId2', title: 'What to buy', filter: 'all' },
   ],
   tasks: {
      ['todolistId1']: [
         { id: v1(), title: 'HTML&CSS', isDone: true },
         { id: v1(), title: 'JS', isDone: false },
      ],
      ['todolistId2']: [
         { id: v1(), title: 'Milk', isDone: false },
         { id: v1(), title: 'React Book', isDone: true },
      ],
   },
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as any);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
   return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
