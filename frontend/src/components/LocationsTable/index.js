import React from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const LocationsTable = ({ locations, isLoading }) => {
  return (
    <TableContainer>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations?.map((location) => (
              <TableRow key={location?._id}>
                <TableCell>{location?.email}</TableCell>
                <TableCell>
                  {new Date(location?.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{location?.latitude}</TableCell>
                <TableCell>{location?.longitude}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default LocationsTable;
