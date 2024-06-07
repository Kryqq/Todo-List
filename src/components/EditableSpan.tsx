import React from 'react';
import { TextField } from '@mui/material';

type EditableSpanPropsType = {
   title: string;
   onClick: (title: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
   const [editMode, setEditmode] = React.useState<boolean>(false);
   const [newTitle, setNewTitle] = React.useState<string>(props.title);

   const activateEditMode = () => {
      setEditmode(!editMode);
      if (editMode) {
         props.onClick(newTitle);
      }
   };

   const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.currentTarget.value);
   };
   return (
      <>
         {editMode ? (
            <TextField value={newTitle} onBlur={activateEditMode} autoFocus onChange={changeTitleHandler} />
         ) : (
            <span onDoubleClick={activateEditMode}> {props.title}</span>
         )}
      </>
   );
});
