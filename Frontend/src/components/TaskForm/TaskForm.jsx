import React from 'react';
import './TaskForm.css';
import { TextField, Button, Box, styled } from '@mui/material';

const AddButton = styled(Button)({
  display: "flex",
  fontFamily: 'Verdana, sans-serif',
  backgroundColor: '#757575',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#616161',
  },
});

const TaskForm = ({ newTask, setNewTask, handleTasks }) => {
  return (
    <form className="form-task" method="post" onSubmit={handleTasks}>
      <Box className='form-box'
        component="form"
        noValidate
        autoComplete="off"
      >
        <div className='form-text' >
          <TextField
            id="outlined-multiline-static"
            label="Escriba la tarea"
            multiline
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
            slotProps={{
              inputLabel: {
                sx: {
                  color: "gray",
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray",
                },
              },
            }}
          />
        </div>
      </Box>
      <AddButton variant="contained" type="submit">
        Agregar
      </AddButton>
    </form>
  );
};

export default TaskForm;
