import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";

const TodoList = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const todo = { title, description, date, time };
    console.log(todo);
    try {
      const { data } = await axios.post(
        "http://localhost:9000/todoRouter/todo/",
        todo
      );
      console.log(data);

      setSuccessMessage("Todo added successfully!");
      setErrorMessage("");
      setTitle("");
      setDescription("");
      setDate(null);
      setTime(null);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add todo. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          margin: "auto",
          backgroundColor: "#f0f0f0", 
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Todo List
        </Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <DatePicker
          label="Date"
          value={date}
          onChange={(newDate) => setDate(newDate)}
          slotProps={{ textField: { fullWidth: true, required: true } }}
        />
        <TimePicker
          label="Time"
          value={time}
          onChange={(newTime) => setTime(newTime)}
          slotProps={{ textField: { fullWidth: true, required: true } }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "50%", mx: "auto" }} 
        >
          Add Todo
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default TodoList;
