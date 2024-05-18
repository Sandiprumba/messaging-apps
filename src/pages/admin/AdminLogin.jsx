import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { bgGradient } from "../../constants/color";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";
import { useEffect } from "react";

//USESELECTOR IS A HOOK PROVIDED BY THE REACT REDUX LIBRARY THAT ALLOWS FUNCTIONAL COMPONENT TO EXTRACT DATA FROM THE REDUX STORE STATE.. ITS ESSENTIALLY A REPLACEMENT FOR THE CONNECT HIGHER ORDER COMPONENT IN CLASS BASED COMPONENTS...
const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth); //USING ISADMIN STATE FROM THE AUTH CREATE SLICE

  const dispatch = useDispatch();
  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;
  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={submitHandler}
          >
            {/* using text field instead of input cause using mui */}

            <TextField required fullWidth label="Secret Key" margin="normal" variant="outlined" type="password" value={secretKey.value} onChange={secretKey.changeHandler} />

            <Button variant="contained" color="primary" type="submit" fullWidth>
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
