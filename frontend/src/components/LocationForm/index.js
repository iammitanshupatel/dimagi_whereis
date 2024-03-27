import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import { object, string } from "yup";
import { useFormik } from "formik";
import DatePicker from "react-datetime-picker";
import axios from "axios";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const validationSchema = object({
  email: string().email("Invalid email format").required("Email is required"),
  location: string().required("Location is required"),
});

const LocationForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const initialValues = { email: "", timestamp: new Date(), location: "" };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_API}/api/submit-location`,
          { ...values, timestamp: new Date(values.timestamp).getTime() }
        );
        console.log("Success::", response.data);
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        resetForm(initialValues);
      } catch (error) {
        console.error("Error:", error);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    },
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box maxWidth={600}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <DatePicker
            name="timestamp"
            onChange={(date) => formik.setFieldValue("timestamp", date)}
            value={formik.values.timestamp}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            name="location"
            label="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting}
        >
          Submit
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity={snackbarSeverity}>
            {snackbarSeverity === "success"
              ? "Location submitted successfully!"
              : "Error submitting location."}
          </Alert>
        </Snackbar>
      </form>
    </Box>
  );
};

export default LocationForm;
