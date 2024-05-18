import { Container, Stack, Typography } from "@mui/material";
import { ErrorIcon } from "react-hot-toast";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="lg" sx={{ height: "100vh" }}>
      <Stack alignItems={"center"} spacing={"2rem"} justifyContent={"center"} height="100%">
        <ErrorIcon sx={{ fontSize: "10rem" }} />
        <Typography variant="h1">404</Typography>
        <Typography variant="h3">Not Found</Typography>
        <Link to="/">GO BACK TO HOME</Link>
      </Stack>
    </Container>
  );
};
export default NotFound;
