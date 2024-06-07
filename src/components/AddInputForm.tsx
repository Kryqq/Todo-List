import React from 'react';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { filterButtonsContainerSx } from '../Todolist.styles';
// import { Button } from './Button';

type AddInputFormType = {
   addItem: (title: string) => void;
};

export const AddInputForm = React.memo((props: AddInputFormType) => {
   const [error, setError] = React.useState<string | null>(null);
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
