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
  const [user, setUser] = useState([]);
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

  const viewFun=async()=>{
    const {data} = await axios.get("http://localhost:9000/userRouter/userView",{
      headers:{
        userid:userId
      }
    })
    setUser(data)
  }
useEffect(()=>{
  viewFun()
},[])
  return (
    <>
      <Container>
        {
          user.length>0 &&
          user.map((view)=>(
           <div key={view._id}>
              <h1>{view.fullname}</h1>
              <img style={{height:"100px", width:"100px", borderRadius:"50%"}} src={`http://localhost:9000/${view.images}`} alt="Image Not Found" />
              
           </div>
          ))
        }
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
