import React, { ChangeEvent, KeyboardEvent } from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { AddBox } from '@mui/icons-material'
import { unwrapResult } from '@reduxjs/toolkit'
import { BaseResponse } from 'common/types/types'

type AddItemFormPropsType = {
  addItem: (title: string) => Promise<any>
  disabled?: boolean
}

export const AddItemForm = function (props: AddItemFormPropsType) {
  let [title, setTitle] = React.useState('')
  let [error, setError] = React.useState<string | null>(null)

  const addItem = () => {
    if (title.trim() !== '') {
      props
        .addItem(title)
        .then(unwrapResult)
        .then(() => setTitle(''))
        .catch((error: BaseResponse) => {
          //TODO add error
          setError(error.messages[0])
        })
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.charCode === 13) {
      addItem()
    }
  }

  return (
    <div>
      <TextField
        variant="outlined"
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        label="Title"
        helperText={error}
        disabled={props.disabled}
      />
      <IconButton color="primary" onClick={addItem} disabled={props.disabled}>
        <AddBox />
      </IconButton>
    </div>
  )
}
