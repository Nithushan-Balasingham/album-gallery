import {
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
import { CollectionImage, UserCollection } from "../utils/types";
import Swal from "sweetalert2";
import ButtonWidget from "../Reusable/ButtonWidget";
import { toast } from "react-toastify";

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
    

  };
const handleBack=()=>{
  navigate('/mycollection')
}

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };
  const handleAddCollectiontoImage = () => {
    if(!selectedImageId){
      return toast.error("Select Image")
    }
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this image to the collection?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAddImageToAlbum();
        Swal.fire("Added!", "Your collection has been updated.", "success");
        setTimeout(()=>{
          navigate("/mycollection")
        },4000);      }
    });
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
          (collection: CollectionImage) => (
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

      <Stack justifyContent={"center"} alignItems={"center"} mt={2}>
        <ButtonWidget
          onClick={loadMoreImages}
          label="Load More"
          disabled={isLoading}
          className="rounded-xl w-60"
        />
      </Stack>
      {matchedCollection?.user && isUserId === matchedCollection.user.id && (
        <Stack direction="column" spacing={2} alignItems="center">
          <Typography variant="h5" color="warning">
            You can add one picture at a time
          </Typography>
         {selectedImageId && (
        <Box
        sx={{
          width: "200px",
          height: "150px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
            >
        <img
          src={filteredCollections.find(
            (collectImg: {
              id: string;
              title?: string;
              description?: string;
              cover_photo?: { id: string; urls: { thumb: string } };
            }) => collectImg.cover_photo?.id === selectedImageId
          )?.cover_photo?.urls.thumb}
          alt="Selected"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
            </Box>
         )}
          <Typography>Selected Image ID: {selectedImageId}</Typography>
          <ButtonWidget
            onClick={handleAddCollectiontoImage}
            label="Add to Collection"
            disabled={!selectedImageId}
            className="rounded-xl w-60"
          />
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

      <ButtonWidget
        onClick={handleBack}
        label="Back"
        endIcon={<ArrowBackIcon />}
        className="rounded-xl w-60"
      />
      <ImagePreviewModal
        open={openModal}
        imageUrl={selectedImage}
        onClose={handleClose}
      />
    </Stack>
  );
};

export default OwnCollection;
