import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import React, { useEffect, useState } from "react";

function UserHome() {
  const [todo, setTodo] = useState([]);
  const userId = localStorage.getItem("userId")
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

  const delFun = async (id) => {
    const ans = window.confirm("Do you want to delete?");

    if (ans) {
      try {
        const { data } = await axios.delete(
          `http://localhost:9000/todoRouter/deletetodo/${id}`
        );
        alert(data);
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("An error occurred while trying to delete the item.");
      }
    } else {
      alert("Operation Cancelled");
    }
  };

  return (
    <>
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Title</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Time</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todo.length > 0 ? (
              todo
                .filter((sort) =>(
                  sort.userId == userId
                )
                )
                .map((list) => (
                  <TableRow key={list._id}>
                    <TableCell>{list.title}</TableCell>
                    <TableCell>{list.description}</TableCell>
                    <TableCell>{list.date}</TableCell>
                    <TableCell>{list.time}</TableCell>
                    <TableCell>
                      <Button href={`/getTodo/${list._id}`}>
                        <EditIcon />
                      </Button>
                      <Button onClick={() => delFun(list._id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Container>
    </>
  );
}

export default UserHome;
