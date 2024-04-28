import React from 'react';
import { Input } from './Input';

type EditableSpanPropsType = {
   title: string;
   onChange: (title: string) => void;
};

export const EditableSpan = (props: EditableSpanPropsType) => {
   const [editMode, setEditmode] = React.useState<boolean>(false);
   const [title, setTitle] = React.useState<string>('');

   const activateEditMode = () => {
      setEditmode(true);
      setTitle(props.title);
   };
   const activateViewMode = () => {
      setEditmode(false);
      props.onChange(title);
   };

   return (
      <>
         {editMode ? (
            <input
               value={title}
               onBlur={activateViewMode}
               autoFocus
               onChange={(e) => setTitle(e.currentTarget.value)}
            />
         ) : (
            <span onDoubleClick={activateEditMode}> {props.title}</span>
         )}
      </>
   );
};
