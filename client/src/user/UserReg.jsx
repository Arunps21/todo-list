import React, { useState } from "react";
import { Container, TextField, Button, Grid, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserReg() {
  const [user, setUser] = useState({});
  const formData = new FormData();
  const navigate = useNavigate();
  const regFun = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const imageFun = (event) => {
    setUser({ ...user, [event.target.name]: event.target.files[0] });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.append("fullname", user.fullname);
    formData.append("images", user.images);
    formData.append("email", user.email);
    formData.append("password", user.password);
    try {
      const { data } = await axios.post(
        "http://localhost:9000/userRouter/reg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-Data",
          },
        }
      );
      if (data.status == 201) {
        navigate("/userLogin");
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.log("Error", err);
    }
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="p-3 mt-5 rounded">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                type="text"
                name="fullname"
                onChange={regFun}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Images"
                type="file"
                name="images"
                onChange={imageFun}
                required
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                name="email"
                onChange={regFun}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                name="password"
                onChange={regFun}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </Grid>
          </Grid>
         <p className="text-center mt-3">If you are already a user <a href="/userLogin">Login Here</a></p>
        </form>
      </Paper>
    </Container>
  );
}

export default UserReg;
