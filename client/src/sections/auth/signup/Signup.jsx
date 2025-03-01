import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import Logo from "../../../components/logo";
import SignUpForm from "./SignupForm";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function SignUpPage() {
  const { login, user } = useAuth();

  if (user) {
    if (user.isAdmin) {
      return <Navigate to={"/dashboard"} replace />;
    }
    return <Navigate to={"/books"} replace />;
  }

  const registerUser = (name, email, password) => {
    if (name === "" || email === "" || password === "") {
      toast.error("Please fill all fields");
    } else {
      axios.post(`http://localhost:8080/api/auth/register`, { name, email, password }, { withCredentials: false })
        .then((response) => {
          if (response.status === 201) {
            console.log(response.data);
            toast.success(`Successfully registered as ${response.data.user.name}`);
            login(response.data.user); // Auto-login after signup
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message || "Signup failed");
          console.log(error);
        });
    }
  };

  return (
    <>
      <Helmet>
        <title> Sign Up | Library</title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 }
          }}
        />

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" sx={{ color: "#666666", fontWeight: "600" }} textAlign="center" gutterBottom
                        paddingBottom={0}>
              Library System
            </Typography>
            <Typography variant="h3" textAlign="center" gutterBottom paddingBottom={3}>
              Sign Up
            </Typography>

            <SignUpForm registerUser={registerUser} />

          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
