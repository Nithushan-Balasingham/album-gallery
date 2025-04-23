import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useAlbumDetails } from "../hooks/useSearchPhotos";
import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import ImagePreviewModal from "../Reusable/ImagePreviewModal";

const AlbumDetailView = () => {
  const { id } = useParams();
  const { data: album, isLoading, error } = useAlbumDetails(id as string);
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleNavigateBack = () => {
    navigate("/");
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  if (isLoading)
    return (
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6">Loading...</Typography>
      </Stack>
    );

  if (error) return <Typography>Error fetching album details</Typography>;

  return (
    <Stack spacing={2} sx={{ padding: 2 }}>
      <Typography variant="h4">{album?.title}</Typography>
      <Typography variant="body1">{album?.description}</Typography>
      <Typography textAlign="center" variant="h6">
        Collection: {album.user.first_name} {album.user.last_name}
      </Typography>
      <Typography textAlign="center" variant="h6">
        Total Photos: {album.total_photos}
      </Typography>
      <Typography textAlign="left" variant="h5">
        Preview Photos: {album?.preview_photos?.length}
      </Typography>

      <Button
        variant="contained"
        endIcon={<ArrowBackIcon />}
        color="error"
        onClick={handleNavigateBack}
        sx={{ textAlign: "center", width: "fit-content" }}
      >
        Back
      </Button>

      <Grid container spacing={2}>
        {album?.preview_photos?.map((photo: any) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={photo.id}>
            <img
              src={photo.urls.thumb}
              alt={photo.slug}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(photo.urls.full)}
            />
          </Grid>
        ))}
      </Grid>

      <ImagePreviewModal
        open={openModal}
        imageUrl={selectedImage}
        onClose={handleClose}
      />
    </Stack>
  );
};

export default AlbumDetailView;
