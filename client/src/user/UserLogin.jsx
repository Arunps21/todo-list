import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [login, setLogin] = useState({});
  const navigate = useNavigate()
  const loginFun = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:9000/userRouter/userLogin",
        login
      );
      if (data.status == 200) {
        localStorage.setItem("userId",data.userId)
        localStorage.setItem("token",data.token)
        alert(data.msg);
        navigate("/userHome")
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="p-3 mt-5 rounded">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                name="email"
                onChange={loginFun}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                name="password"
                onChange={loginFun}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Grid>
          </Grid>
          <p className="text-center mt-3">
            If you are not a user please <a href="/regTodo">SignUp Here</a>
          </p>
        </form>
      </Paper>
    </Container>
  );
}

export default UserLogin;
