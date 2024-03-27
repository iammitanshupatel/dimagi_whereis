import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LocationsTable from "../../components/LocationsTable";

const Dashboard = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/locations`
      );
      console.log(response?.data);
      setLocations(response?.data);
    } catch (err) {
      console.error(err);
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box m={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>Locations available</h1>
        <Button
          sx={{ height: "40px" }}
          variant="contained"
          onClick={() => navigate("/new-data")}
          color="primary"
        >
          Create new record
        </Button>
      </Box>
      <LocationsTable locations={locations} isLoading={isLoading} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error">Error fetching locations.</Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
