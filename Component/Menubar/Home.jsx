import { AppBar, Toolbar, IconButton, Button, Box, Paper, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { RiTranslate2 } from "react-icons/ri";
import PersonIcon from "@mui/icons-material/Person";

export default function HomePage({ onExplore }) {
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          bgcolor: "transparent", boxShadow: "none",
        }}
      >
        <Toolbar sx={{
          display: "flex", justifyContent: "flex-end", gap: 2,
        }}>
          <IconButton color="primary">
            <RiTranslate2 size={24} />
          </IconButton>
          <Button
            startIcon={<PersonIcon />}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "10px",
              px: 3,
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
            color: "primary.main",
            fontFamily: "Poppins, sans-serif",

          }}
        >
          Welcome to Navira Library
        </Typography>
        <Typography
          variant="subtitle1"

          sx={{ color: "text.secondary", }}
        >
          Your gateway to timeless stories & modern knowledge
        </Typography>
      </Box>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            maxWidth: "1480px",
            width: "100%",
          }}
        >
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h3"
              fontWeight={600}
              gutterBottom
              fontStyle={"oblique"}
            >
              Online Library
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                mb: 3,
                fontFamily: "Poppins, sans-serif",
                fontSize: "1rem",
              }}
            >
              Discover a world of knowledge at your fingertips with our Online

              Library. From timeless classics to the latest research, every

              resource is curated for learners and thinkers. Access your

              favorite books anytime, anywhere, with just a click. Empower your

              journey with limitless reading and boundless opportunities.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 3, px: 4 }}
              onClick={onExplore}
            >
              Explore Books
            </Button>
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <img
              src="assets/b83c522833eeff0e4377bfb38b8e3aeb.jpg"
              alt="Online Library"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 24,
              }}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
}
