import React, { useEffect, useState, useRef } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const EditTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const ref = useRef(null);
  const navigate = useNavigate()

  const editFun = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/todoRouter/edittodo",
        { headers: { id: params.id } }
      );
      console.log(data[0]);
      ref.current["title"].value = data[0].title;
      ref.current["description"].value = data[0].description;
      ref.current["date"].value = data[0].date;
      ref.current["time"].value = data[0].time;
    } catch (err) {
      console.log(err);
    }
  };

  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const todo = { title, description, date, time };
    const { data } = await axios.post(
      "http://localhost:9000/todoRouter/updatetodo",
      todo,
      { headers: { id: params.id } }
    );
    alert(data);
    navigate("/")
  };
  useEffect(() => {
    editFun();
  }, []);
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
        ref={ref}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Edit Todo
        </Typography>
        <TextField
          variant="outlined"
          name="title"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          variant="outlined"
          multiline
          name="description"
          rows={4}
          fullWidth
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          onChange={(newDate) => setDate(newDate)}
          name="date"
          slotProps={{ textField: { fullWidth: true, required: true } }}
        />
        <TextField
          onChange={(newTime) => setTime(newTime)}
          name="time"
          slotProps={{ textField: { fullWidth: true, required: true } }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "50%", mx: "auto" }}
        >
          Edit Todo
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default EditTodo;
