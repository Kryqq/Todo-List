import React from 'react';
import { Input } from './Input';
import { Button } from './Button';

type AddInputFormType = {
   addItem: (title: string) => void;
};

const AddInputForm = (props: AddInputFormType) => {
   const [error, setError] = React.useState<string | null>(null);
   const [inputTitle, setInputTitle] = React.useState('');

   const addItemHandler = () => {
      if (inputTitle.trim() !== '') {
         props.addItem(inputTitle.trim());
         setInputTitle('');
      } else {
         setError('Title is required');
      }
   };

   const addItemOnKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (event.key === 'Enter') {
         addItemHandler();
      }
   };

   return (
      <div>
         <Input
            inputTitle={inputTitle}
            className={error ? 'error' : ''}
            onKeyUp={addItemOnKeyUpHandler}
            setInputTitle={setInputTitle}
         />
         <Button callback={addItemHandler} Btntitle={'+'} />

         {error && <div className="error-message">{error}</div>}
      </div>
   );
};

export default AddInputForm;
