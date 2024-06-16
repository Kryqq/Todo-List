import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { action } from '@storybook/addon-actions';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AddInputForm, AddInputFormType } from '../components/AddInputForm';
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { filterButtonsContainerSx } from '../Todolist.styles';
import IconButton from '@mui/material/IconButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddInputForm> = {
   title: 'TODOLISTS/AddInputForm',
   component: AddInputForm,
   parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: 'centered',
   },
   // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
   tags: ['autodocs'],
   // More on argTypes: https://storybook.js.org/docs/api/argtypes
   argTypes: {
      addItem: {
         description: 'Button clicked callback',
         //     action: 'Clicked',
      },
   },
   // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
   args: { addItem: fn() },
};

export default meta;
type Story = StoryObj<typeof AddInputForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddInputFormStory: Story = {
   //    args: {
   //       addItem: action('Button clicked'),
   //    },
};
const AddInputFormWithError = React.memo((props: AddInputFormType) => {
   const [error, setError] = React.useState<string | null>('Title is required');
   const [value, setValue] = React.useState('');

   const addItemHandler = () => {
      if (value.trim() !== '') {
         props.addItem(value.trim());
         setValue('');
      } else {
         setError('Title is required');
      }
   };

   const addItemOnKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
         setError(null);
      }

      if (event.key === 'Enter') {
         addItemHandler();
      }
   };

   //    const buttonStyles= { maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' };

   return (
      <Box sx={filterButtonsContainerSx}>
         <TextField
            id="outlined-basic"
            label="Enter new title"
            variant="outlined"
            value={value}
            onKeyUp={addItemOnKeyUpHandler}
            onChange={(e) => setValue(e.currentTarget.value)}
            size="small"
            error={!!error}
            helperText={error}
         />
         {/* <Input
		    inputTitle={inputTitle}
		    className={error ? 'error' : ''}
		    onKeyUp={addItemOnKeyUpHandler}
		    setInputTitle={setInputTitle}
		 /> */}
         {/* <Button callback={addItemHandler} Btntitle={'+'} /> */}
         <IconButton onClick={addItemHandler} color={'primary'}>
            <AddBoxIcon />
         </IconButton>
         {/* {error && <div className="error-message">{error}</div>} */}
      </Box>
   );
});

export const AddInputFormWithErrorStory: Story = {
   render: (args) => <AddInputFormWithError addItem={args.addItem} />,
};
