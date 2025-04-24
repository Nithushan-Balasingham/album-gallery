import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { useSearchPhotos } from "../hooks/useSearchPhotos";
import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import ImagePreviewModal from "../Reusable/ImagePreviewModal";
import { useAddImageToAlbum } from "../hooks/useUploadImage";
import SearchBar from "./Searchbar";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useUserCollections } from "../hooks/useUser";
import { UserCollection } from "../utils/types";

const OwnCollection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.username);
  const isUserId = useSelector((state: RootState) => state.auth.id);
  const { data: userCollection } = useUserCollections(user ?? undefined);

  const matchedCollection: UserCollection | undefined = userCollection?.find(
    (collection: UserCollection) => collection.id === id
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { mutate: addImageToAlbumMutation } = useAddImageToAlbum();
  const {
    data: collections,
    isLoading,
    error,
  } = useSearchPhotos(searchQuery, page, 30);

  const handleImageSelect = (imageId: string) => {
    setSelectedImageId(imageId);
  };

  const loadMoreImages = () => setPage((prev) => prev + 1);

  const handleAddImageToAlbum = () => {
    if (id && selectedImageId) {
      addImageToAlbumMutation({ albumId: id, photoId: selectedImageId });
    }
    navigate("/mycollection");
  };

  const handleNavigateBack = () => navigate("/");

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
    <Stack spacing={3} sx={{ padding: 3 }}>
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={collection.id}>
              <Box
                onClick={() =>
                  collection.cover_photo?.id &&
                  handleImageSelect(collection.cover_photo.id)
                }
                sx={{
                  border:
                    selectedImageId === collection.cover_photo?.id
                      ? "3px solid #1976d2"
                      : "none",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                }}
              >
                <img
                  src={collection.cover_photo?.urls.thumb}
                  alt={collection.title}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>

              <Typography textAlign={"center"}>{collection.title}</Typography>
            </Grid>
          )
        )}
      </Grid>

      <Button onClick={loadMoreImages} disabled={isLoading}>
        {isLoading ? "Loading More..." : "Load More"}
      </Button>

      {matchedCollection?.user && isUserId === matchedCollection.user.id && (
        <Stack direction="column" spacing={2} alignItems="center">
          <Typography>Selected Image ID: {selectedImageId}</Typography>
          <Button
            className="rounded-xl w-60"
            variant="contained"
            onClick={handleAddImageToAlbum}
          >
            Add to Collection
          </Button>
        </Stack>
      )}

      <Box>
        <Typography variant="h4">Title:{matchedCollection?.title}</Typography>
        <Typography variant="h6" marginTop={"10px"}>
          Description: {matchedCollection?.description}
        </Typography>
        <Typography textAlign="center" variant="h6">
          Collection by: {matchedCollection?.user?.first_name}{" "}
          {matchedCollection?.user?.last_name}
        </Typography>
        <Typography textAlign="center" variant="h6">
          Total Photos: {matchedCollection?.total_photos}
        </Typography>
        <Typography textAlign="left" variant="h5" sx={{ mt: 3 }}>
          Preview Photos ({matchedCollection?.preview_photos?.length})
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {matchedCollection?.preview_photos?.map((photo) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={photo.id}>
              <Box
                onClick={() => handleImageClick(photo.urls.full)}
                sx={{ cursor: "pointer" }}
              >
                <img
                  key={photo.id}
                  src={photo.urls.thumb}
                  alt={"Photo"}
                  style={{
                    width: "100% ",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                  onClick={() => handleImageClick(photo.urls.full)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Button
        variant="contained"
        endIcon={<ArrowBackIcon />}
        color="error"
        onClick={handleNavigateBack}
        sx={{ mt: 3, alignSelf: "center" }}
      >
        Back
      </Button>

      <ImagePreviewModal
        open={openModal}
        imageUrl={selectedImage}
        onClose={handleClose}
      />
    </Stack>
  );
};

export default OwnCollection;
