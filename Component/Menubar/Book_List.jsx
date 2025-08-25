import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Avatar,
  Box,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { deleteBook } from "./Store";

export default function BookList({onEditBook}) {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleOpen = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedIndex(null);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev > 0 ? prev - 1 : books.length - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev < books.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          mb: 6, fontWeight: "bold", textAlign: "center",
          fontFamily: "Poppins, sans-serif",

        }}
      >
        <span style={{ marginRight: "10px" }}>📚</span>
        <span
          style={{
            color: "#7C3AED",
            display: "inline-block",
            // textAlign:"center"

          }} >
          Trending Books Collection
        </span>
      </Typography>


      <Grid container spacing={3} sx={{ mt: 2 }}>
        {books.length === 0 ? (
          <Typography variant="h6" sx={{ m: "auto", mt: 5 }}>
            No books added yet 📚
          </Typography>
        ) : (
          books.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  width: "100%",
                  maxWidth: 500,
                  mx: "auto",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >

                <CardContent>
                  <Avatar
                    src={book.image}
                    variant="rounded"
                    sx={{
                      width: "100%",
                      height: 250,
                      mb: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpen(index)}
                  />

                  <Typography
                    variant="h6"
                    noWrap
                    title={book.title}
                    sx={{ fontWeight: "bold" }}
                  >
                    Title: {book.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    noWrap
                    title={book.author}
                  >
                    Author: {book.author}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      display: "-webkit-box",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                    }}
                    title={book.description}
                  >
                    {book.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Date: {book.date}
                  </Typography>

                  <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button
                      variant="outlined"
                      color="success"
                       onClick={() => onEditBook(index, book)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => dispatch(deleteBook(index))}
                    >
                      Delete
                    </Button>
                  </Box>



                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>


      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
            boxShadow: "none",

          },
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          "@keyframes zoomIn": {
            "0%": { transform: "scale(0.7)", opacity: 0 },
            "100%": { transform: "scale(1)", opacity: 1 },
          },
        }}
      >
        {selectedIndex !== null && (
          <Box sx={{ position: "relative", textAlign: "center" }}>

            <IconButton
              onClick={handleClose}
              sx={{
                position: "fixed",
                top: 20,
                right: 20,
                zIndex: 1500,
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              }}
            >
              <CloseIcon />
            </IconButton>



            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: 10,
                transform: "translateY(-50%)",
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>


            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: 10,
                transform: "translateY(-50%)",
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>


            <img
              src={books[selectedIndex].image}
              alt="Book Preview"
              style={{
                maxWidth: "90%",
                maxHeight: "80vh",
                borderRadius: "10px",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </Box>
        )}
      </Dialog>
    </>
  );
}
