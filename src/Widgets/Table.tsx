import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AlbumTableProps } from "../utils/types";



const AlbumTable: React.FC<AlbumTableProps> = ({
  albums,
  selectedAlbumId,
  onAlbumClick,
  onViewClick,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="250px">
              <Typography variant="h6">Album</Typography>
            </TableCell>
            <TableCell width="500px">
              <Typography variant="h6">Description</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">View</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {albums?.map((album) => (
            <TableRow
              key={album.id}
              onClick={() => onAlbumClick(album)}
              hover
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedAlbumId === album.id ? "#e0f7fa" : "inherit",
              }}
            >
              <TableCell>{album.title}</TableCell>
              <TableCell>{album.description || "No description available"}</TableCell>
              <TableCell onClick={(e) => {
                e.stopPropagation(); 
                onViewClick(album.id);
              }}>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AlbumTable;
