import * as React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Stack,
} from "@mui/material";
import PersonOutline from "@mui/icons-material/PersonOutline";
import LockOutlined from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const ILLUSTRATION_SRC = "/assets/abfe6e8a83999b31b7e92ba79dfdb106.jpg";
export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "94vh",
        bgcolor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "hidden",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth=""
      sx={{
        width:"78%",
       padding:"80px",

      
        border: "1px solid black"
        
      }}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          direction={{ xs: "column", md: "row" }}
        >
        
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: "#e9e8d9ff",
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 3,
                maxWidth: 470, 
                mx: "auto",
              }}
            >
              <Card elevation={0} sx={{ bgcolor: "transparent" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    align="center"
                    sx={{ fontWeight: 600, mb: 3, color: "#233049" }}
                  >
                    Sign in to Logo
                  </Typography>

                  <TextField
                    fullWidth
                    label="Email"
                    variant="filled"
                    type="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutline />
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                    sx={{
                      mb: 2,
                      "& .MuiFilledInput-root": {
                        borderRadius: "999px",
                        bgcolor: "#fff",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    variant="filled"
                    type="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined />
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                    sx={{
                      mb: 3,
                      "& .MuiFilledInput-root": {
                        borderRadius: "999px",
                        bgcolor: "#fff",
                      },
                    }}
                  />

                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: "999px",
                        px: 10, // 👈 instead of width use padding
                        py: 1.2,
                        textTransform: "none",
                        fontWeight: 600,
                        bgcolor: "#233049",
                        "&:hover": { bgcolor: "#1a263a" },
                      }}
                    >
                      Sign in
                    </Button>
                  </Box>

                  <Typography
                    align="center"
                    sx={{ mt: 2, color: "text.secondary",fontSize:"14px" }}
                  >
                    Or sign in with
                  </Typography>

                  <Stack
                    spacing={1.5}
                    sx={{ mt: 2 }}
                    alignItems="center" // 👈 center alignment
                  >
                    <Button
                      variant="outlined"
                      startIcon={<GoogleIcon />}
                      sx={{
                        borderRadius: "999px",
                        textTransform: "none",
                        border:"none",
                        bgcolor: "#fff",
                        width: "80%", // 👈 same width
                        p: 1,
                      }}
                    >
                      Sign in with Google
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={<FacebookIcon />}
                      sx={{
                        borderRadius: "999px",
                        textTransform: "none",
                        bgcolor: "#fff",
                        border:"none",
                        
                        width: "80%", // 👈 same width
                        p: 1,
                      }}
                    >
                      Sign in using Facebook
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          {/* Right panel: welcome + image */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{ fontSize: "25px", color: "#233049", mb: 1 ,
                fontFamily: "Poppins, sans-serif",fontWeight:"bold"

                }}
              >
                Welcome Back!
              </Typography>

              <Typography sx={{ color: "text.secondary" ,letterSpacing:"1px",fontFamily:"revert"}}>
                Log in to explore and share book reviews.
              </Typography>

              <Box
                component="img"
                src={ILLUSTRATION_SRC}
                alt="Books & reviews illustration"
                sx={{
                  width: { xs: "80%", sm: "70%", md: "90%" },
                  maxWidth: 705,
                  
                  // borderRadius: "100%", // 👈 remove circle, make nice rounded
                  height: "auto",
                  mx: "auto",
                  display: "block",
                }}
              />

              <Typography sx={{ mt: 2, color: "text.secondary" ,fontFamily:"revert"}}>
                Don’t have an account?{" "}
                <Button variant="text" sx={{ p: 0, minWidth: 0 ,}}>
                  Sign Up
                </Button>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
