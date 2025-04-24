/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Grid,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import {   useState } from "react";
import axios from "axios";
import { AlbumFormData } from "./albumSchema";
import { useNavigate } from "react-router";
import ImagePreviewModal from "../Reusable/ImagePreviewModal";
import { useUnsplashUser, useUserCollections } from "../hooks/useUser";
import AlbumTable from "../Widgets/Table";
import AlbumCardGrid from "../Widgets/AlbumGrid";
import AlbumPreview from "../Widgets/AlbumPreview";
import { AuthComp } from "./AuthComp";
import AddCollection from "./AddCollection";


const MyCollection = () => {
  const [selectedMyAlbum, setSelectedMyAlbum] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"table" | "folder">("table");
  const navigate = useNavigate();

  const handleRoute = (id: string) => {
    navigate(`/collection/${id}`);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };
  const { data: userData, isLoading: userLoading } = useUnsplashUser();
  const { data: userColletion } = useUserCollections(userData?.username);

  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleClose = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };
  const handleAlbumSubmit = async (data: AlbumFormData) => {
    try {
      const response = await axios.post("/api/albums", {
        title: data.title,
        description: data.description,
        private: data.private,
        images: data.images,
      });


    } catch (err) {
      console.error("Album creation failed", err);
    }
  };

  const handleMyAlbumClick = (album: any) => {
    if (selectedMyAlbum?.id === album.id) {
      setSelectedMyAlbum(null);
    } else {
      setSelectedMyAlbum(album);
    }
  };

  return (
    <Stack direction={"column"} alignItems={"center"} className=" p-4 w-full ">
      <AuthComp />
      <AddCollection />

      <FormControl style={{ minWidth: 150, marginTop: 16 }}>
        <InputLabel>View</InputLabel>
        <Select
          value={viewMode}
          label="View"
          onChange={(e) => setViewMode(e.target.value as "table" | "folder")}
        >
          <MenuItem value="table">Table View</MenuItem>
          <MenuItem value="folder">Folder View</MenuItem>
        </Select>
      </FormControl>

      {!userColletion  || userColletion .length === 0 ? (
        <Typography variant="h5">No Collections Found</Typography>
      ) : (
        <Box>
          <Grid container spacing={4} style={{ marginTop: "12px" }}>
            <Grid size={{ xs: 12, md: selectedMyAlbum ? 6 : 12 }}>
              {viewMode === "table" ? (
                <>
                  <AlbumTable
                    albums={userColletion}
                    selectedAlbumId={selectedMyAlbum?.id}
                    onAlbumClick={handleMyAlbumClick}
                    onViewClick={handleRoute}
                  />
                </>
              ) : (
                <Grid container spacing={2}>
                  <AlbumCardGrid
                    albums={userColletion}
                    selectedAlbumId={selectedMyAlbum?.id}
                    onAlbumClick={handleMyAlbumClick}
                    onViewClick={handleRoute}
                  />
                </Grid>
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 6, xl: 6 }}>
              {selectedMyAlbum &&
                (selectedMyAlbum.preview_photos?.length > 0 ? (
                  <AlbumPreview
                    title={selectedMyAlbum.title}
                    previewPhotos={selectedMyAlbum.preview_photos}
                    onImageClick={handleImageClick}
                  />
                ) : (
                  <Typography  variant="body1" color="textSecondary">
                    No preview photos available for this album.
                  </Typography>
                ))}
            </Grid>
          </Grid>
        </Box>
      )}
      <ImagePreviewModal
        open={openModal}
        imageUrl={selectedImage}
        onClose={handleClose}
      />
    </Stack>
  );
};

export default MyCollection;
