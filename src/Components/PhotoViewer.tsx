import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useAlbumDetails, useSearchPhotos } from "../hooks/useSearchPhotos";
import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import ImagePreviewModal from "../Reusable/ImagePreviewModal";
import SearchBar from "./Searchbar";


const AlbumDetailView = () => {
  const { id } = useParams();
  const { data: album } = useAlbumDetails(id as string);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  console.log("album", album);
  // const { data: collections, isLoading, error } =
  //   searchQuery.trim() !== '' ? useSearchPhotos(searchQuery.trim(), 1, 20) : { data: [], isLoading: false, error: null };
  const [page, setPage] = useState(1);

  const {
    data: collections,
    isLoading,
    error,
  } = useSearchPhotos(searchQuery, page, 30);

  const handleImageSelect = (imageId: string) => {
    setSelectedImageId(imageId);
  };
  const loadMoreImages = () => {
    setPage((prev) => prev + 1);
  };


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

  const filteredCollections = collections?.filter(
    (col: { id: string; title?: string; description?: string }) =>
      col.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      col.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Stack spacing={2} sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h4">Search and Add from Collections</Typography>
        <SearchBar search={searchQuery} setSearch={setSearchQuery} />

        {isLoading && <CircularProgress />}
        {error && (
          <Typography color="error">Error fetching collections</Typography>
        )}

        <Grid container spacing={2}>
          {filteredCollections?.map(
            (collection: {
              id: string;
              title: string;
              description?: string;
              cover_photo?: { id: string; urls: { thumb: string } };
            }) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={collection.id}>
                <img
                  src={collection.cover_photo?.urls.thumb}
                  alt={collection.title}
                  style={{
                    width: "200px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                  onClick={() =>
                    collection.cover_photo?.id &&
                    handleImageSelect(collection.cover_photo.id)
                  }
                />
                <Typography>{collection.title}</Typography>
              </Grid>
            )
          )}
        </Grid>
        <Button onClick={loadMoreImages} disabled={isLoading}>
          {isLoading ? "Loading More..." : "Load More"}
        </Button>

      </Stack>

      <Typography variant="h4">{album?.title}</Typography>
      <Typography variant="body1">{album?.description}</Typography>
      <Typography textAlign="center" variant="h6">
        Collection: {album?.user?.first_name} {album?.user?.last_name}
      </Typography>
      <Typography textAlign="center" variant="h6">
        Total Photos: {album?.total_photos}
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
        {album?.preview_photos?.map(
          (photo: {
            id: string;
            urls: { thumb: string; full: string };
            slug: string;
          }) => (
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
          )
        )}
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
