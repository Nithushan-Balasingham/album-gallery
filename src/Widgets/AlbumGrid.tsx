import React from "react";
import {
  Grid,
  Box,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AlbumCardGridProps } from "../utils/types";


const AlbumCardGrid: React.FC<AlbumCardGridProps> = ({
  albums,
  selectedAlbumId,
  onAlbumClick,
  onViewClick,
}) => {
  return (
                <Grid container spacing={2}>
    
      {albums.map((album) => (
        <Grid size={{xs:12, sm:6, md:albums?.length > 1 ? 4 : 12}} key={album.id}>
          <Box
            onClick={() => onAlbumClick(album)}
            sx={{
              cursor: "pointer",
              p: 2,
              height: "100%",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: 2,
              backgroundColor: selectedAlbumId === album.id ? "#e0f7fa" : "white",
              boxShadow: 1,
              transition: "0.3s",
              "&:hover": {
                boxShadow: 3,
              },
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h5" gutterBottom>
                {album.title}
              </Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onViewClick(album.id);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Stack>
            <Typography variant="body2">
              {album.description || "No description"}
            </Typography>
          </Box>
        </Grid>
      ))}
                  </Grid>
    
  );
};

export default AlbumCardGrid;
