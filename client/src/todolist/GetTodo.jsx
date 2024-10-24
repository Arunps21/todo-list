import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from "@mui/material";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  
  function GetTodo() {
    const [todo, setTodo] = useState([]);
  
    useEffect(() => {
      axios
        .get("http://localhost:9000/todoRouter/gettodo")
        .then((res) => {
          setTodo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  
    return (
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todo.length > 0 ? (
              todo.map((list) => (
                <TableRow key={list._id}>
                  <TableCell>{list.title}</TableCell>
                  <TableCell>{list.description}</TableCell>
                  <TableCell>{list.date}</TableCell>
                  <TableCell>{list.time}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Container>
    );
  }
  
  export default GetTodo;
  