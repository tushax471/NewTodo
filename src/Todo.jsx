import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const handleDelete = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
    if (editIndex === index) setEditIndex(null);
  };

  const handleEditChange = (e, index) => {
    const updated = [...tasks];
    updated[index] = e.target.value;
    setTasks(updated);
  };

  return (
    <Box
      sx={{
        bgcolor: "lightblue",
        p: 3,
        borderRadius: 2,
        m: 2,
        maxWidth: 500,
        mx: "auto",
      }}
    >
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Enter task"
          variant="outlined"
          fullWidth
          autoFocus
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </Box>

      <List>
        {tasks.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <>
                <IconButton onClick={() => setEditIndex(index)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(index)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            {editIndex === index ? (
              <TextField
                value={item}
                onChange={(e) => handleEditChange(e, index)}
                onBlur={() => setEditIndex(null)}
                size="small"
                fullWidth
                autoFocus
              />
            ) : (
              <Typography sx={{ wordBreak: "break-word" }}>~ {item}</Typography>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Todo;
