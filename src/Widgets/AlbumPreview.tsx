import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { AlbumPreviewPhotosProps } from "../utils/types";



const AlbumPreview: React.FC<AlbumPreviewPhotosProps> = ({
  title,
  previewPhotos,
  onImageClick,
}) => {
  if (!previewPhotos || previewPhotos.length === 0) return null;
  console.log(previewPhotos)
  return (
    <Stack direction={"column"} spacing={2} alignItems={"center"} justifyContent={"center"} width={"100%"}>  
      <Typography variant="h6" gutterBottom>
        Preview Photos: {title}
      </Typography>
      <Grid container spacing={2}>
        {previewPhotos.map((photo) => (
          <Grid size={{xs:6, sm:6, lg:4}} key={photo.id}>
            <img
              src={photo.urls.thumb}
              alt={photo.slug}
              style={{
                width: "500px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              onClick={() => onImageClick(photo.urls.full)}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default AlbumPreview;
