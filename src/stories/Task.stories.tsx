import { Meta, StoryObj } from '@storybook/react/*';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStoreProviderDecorator } from '../hooks/ReduxStoreProviderDecorator';
import { AppRootStateType } from '../model/redux/store/store';
import { TaskType } from '../TodolistWithRedux';
import { Task } from '../components/Task';
import { addTaskAC } from '../model/tasks-reducer/tasks-reducer';

const meta: Meta<typeof Task> = {
   component: Task,

   title: 'TODOLISTS/Task',

   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   decorators: [ReduxStoreProviderDecorator],
};

export default meta;

type Story = StoryObj<typeof Task>;

const TaskWithRedux = () => {
   let task = useSelector<AppRootStateType, TaskType>((state) => state.tasks['todolistId1'][0]);

   const dispatch = useDispatch();

   if (!task) {
      task = { id: '1', title: 'task', isDone: false };
      dispatch(addTaskAC('task', 'todolistId1'));
   }

   return <Task task={task} todolistId={'todolistId1'} />;
};

export const TaskStory: Story = {
   render: () => <TaskWithRedux />,
};
