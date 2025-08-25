import { useEffect, useState } from "react";
import {
  Card, CardContent, Typography, Box,
  TextField, Button, Grid, Avatar, Divider
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "./Store";

export default function AddList({ onAddBook, editingBook, editingIndex, onFinishEdit }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    date: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    }
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setErrors({ ...errors, image: "" });
      };
      reader.readAsDataURL(file);
    }
  };
  const validateForm = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "Enter the Title";
    if (!formData.author) newErrors.author = "Enter the Author";
    if (!formData.image) newErrors.image = "Upload the Image";
    if (!formData.description) newErrors.description = "Enter the Description";
    if (!formData.date) newErrors.date = "Enter the Date";

    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingBook) {

      dispatch(updateBook({ index: editingIndex, updatedBook: formData }));
      if (onFinishEdit) onFinishEdit();
    } else {

      dispatch(addBook(formData));
      if (onAddBook) onAddBook(formData);
      setFormData({ title: "", author: "", description: "", date: "", image: "" });
    }
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden", minHeight: "86vh", width: "100%" }}>

      {[...Array(15)].map((_, i) => (
        <Typography
          key={i}
          sx={{
            position: "absolute",

            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: { xs: "1.2rem", md: "1.8rem" },
            opacity: 0.2,
            animation: `float ${10 + i}s infinite linear`,
          }}
        >
          📖
        </Typography>
      ))}


      <Grid container spacing={6} alignItems="center" sx={{ position: "relative", zIndex: 2, p: { xs: 2, md: 6 } }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: "relative", p: 3 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                lineHeight: 1.3,
              }}
            >
              We tell <br />
              <Box component="span" sx={{ color: "#7C3AED" }}>
                ourselves
              </Box>{" "}
              <br />
              Stories <br />
              <Box component="span" sx={{ bgcolor: "#7C3AED", px: 2, color: "white" }}>
                in Order To
              </Box>{" "}
              Live ....📖
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            elevation={8}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
              bgcolor: "rgba(255,255,255,0.95)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#7C3AED",
                color: "white",
                px: 3,
                py: 2,
              }}
            >
              <MenuBookIcon sx={{ fontSize: 36, mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Add New Book
              </Typography>
            </Box>

            <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
              <Box component="form" onSubmit={handleSubmit}>
                <Box
                  sx={{
                    border:  `2px dashed ${errors.image ? "red" : "#ccc"}`, 
                    borderRadius: 3,
                    p: 3,
                    textAlign: "center",
                    mb: 3,
                  }}
                >
                  <Button variant="text" component="label">
                    {formData.image ? (
                      <Avatar
                        src={formData.image}
                        variant="rounded"
                        sx={{
                          width: 120,
                          height: 160,
                          mx: "auto",
                          boxShadow: 3,
                          borderRadius: 2,
                           border: errors.image ? "2px solid red" : "none",
                        }}
                      />
                    ) : (
                      <Typography
                        color="text.secondary">
                        📖 Click to Upload Cover
                      </Typography>
                    )}
                    <input type="file" hidden onChange={handleUpload} />

                  </Button>

                </Box>
                {/* {errors.image && (
                  <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                    {errors.image}
                  </Typography>
                )} */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Book Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      error={!!errors.title}
                      // helperText={errors.title}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      error={!!errors.author}
                      // helperText={errors.author}
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  multiline
                  rows={3}
                  sx={{ mt: 2 }}
                  error={!!errors.description}
                  // helperText={errors.description}
                />

                <TextField
                  label="Published Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.date}
                  // helperText={errors.date}
                />

                <Divider sx={{ my: 3 }} />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: 3,
                    fontWeight: "bold",
                    py: 1.5,
                    fontSize: "1rem",
                    textTransform: "none",
                  }}
                >
                  {editingBook ? "✏️ Update Book" : "➕ Add Book"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }
        `}
      </style>
    </Box>
  );
}
