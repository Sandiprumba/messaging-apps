import { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Stack, Avatar, IconButton } from "@mui/material";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useInputValidation, useStrongPassword, useFileHandler } from "6pp";
import { usernameValidator } from "../utils/Validators";
import { bgGradient } from "../constants/color";
import axios from "axios";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  //to prevent the login button from clicking and pendning fetch xhr
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();
  //user login configurations..
  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");
    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    //taking data with destructuring method directly
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      console.log(error);
      //way to safely access nested properties of an object in js
      toast.error(error?.response?.data?.message || "something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };
  //sign up users
  const handleSignup = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing up...");
    setIsLoading(true);
    //built in js object that provies a way to easily construct a set of key/value pairs representing form fields and theirs values
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await axios.post(`${server}/api/v1/user/new`, formData, config);
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };
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
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                {/* using text field instead of input cause using mui */}
                <TextField required fullWidth label="Username" margin="normal" variant="outlined" value={username.value} onChange={username.changeHandler} />
                <TextField required fullWidth label="Password" margin="normal" variant="outlined" type="password" value={password.value} onChange={password.changeHandler} />

                <Button variant="contained" color="primary" type="submit" fullWidth disabled={isLoading}>
                  Login
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button fullWidth variant="text" onClick={toggleLogin} disabled={isLoading}>
                  Sign up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Sign up</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignup}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography color="error" m={"1rem auto"} variant="caption" width={"fit-content"} display={"block"}>
                    {avatar.error}
                  </Typography>
                )}
                {/* using text field instead of input cause using mui */}
                <TextField required fullWidth label="name" margin="normal" variant="outlined" value={name.value} onChange={name.changeHandler} />
                <TextField required fullWidth label="Bio" margin="normal" variant="outlined" value={bio.value} onChange={bio.changeHandler} />
                <TextField required fullWidth label="Username" margin="normal" variant="outlined" value={username.value} onChange={username.changeHandler} />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
                <TextField required fullWidth label="Password" margin="normal" variant="outlined" type="password" value={password.value} onChange={password.changeHandler} />
                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}

                <Button variant="contained" color="primary" type="submit" fullWidth disabled={isLoading}>
                  Sign Up
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button fullWidth variant="text" onClick={toggleLogin} disabled={isLoading}>
                  LogIn Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
