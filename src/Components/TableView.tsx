/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Grid,
  Typography,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";
import SearchBar from "./Searchbar";
import { useEffect, useState } from "react";
import { useSearchPhotos } from "../hooks/useSearchPhotos";
import { useNavigate } from "react-router";
import ImagePreviewModal from "../Reusable/ImagePreviewModal";
import AlbumTable from "../Widgets/Table";
import AlbumCardGrid from "../Widgets/AlbumGrid";
import AlbumPreview from "../Widgets/AlbumPreview";
import { Album } from "../utils/types";
import ButtonWidget from "../Reusable/ButtonWidget";

const TableView = () => {
  const [search, setSearch] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [viewMode, setViewMode] = useState<"table" | "folder">("table");
  const navigate = useNavigate();

  const handleRoute = (id: string) => {
    navigate(`/${id}`);
  };

  const handleRouteCollection = () => {
    navigate("/mycollection");
  };
  const { data: collections, isLoading: isPhotoLoading } = useSearchPhotos(
    search,
    page,
    perPage
  );
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };

  const filteredCollections = collections?.filter((album: Album) =>
    album.title.toLowerCase().includes(search.toLowerCase())
  );
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleClose = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  const handleAlbumClick = (album: any) => {
    if (selectedAlbum?.id === album.id) {
      setSelectedAlbum(null);
    } else {
      setSelectedAlbum(album);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };
  useEffect(() => {
    setSelectedAlbum(null);
  }, [search]);
  return (
    <Stack direction={"column"} alignItems={"center"} className=" p-4 w-full">
      <SearchBar search={search} setSearch={setSearch} />

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

      <ButtonWidget
          onClick={handleRouteCollection}
          label="My Collection"
          className="rounded-xl w-60"
          />
      {isPhotoLoading ? (
        <Box marginTop={"40px"}><CircularProgress /></Box>
      ) : !filteredCollections || filteredCollections.length === 0 ? (
        <Typography marginTop={"40px"} variant="h5">
          No Collections Found
        </Typography>
      ) : isPhotoLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4} style={{ marginTop: "12px" }}>
          <Grid size={{ xs: 12, md: selectedAlbum ? 6 : 12 }}>
            {viewMode === "table" ? (
              <>
                <AlbumTable
                  albums={filteredCollections}
                  selectedAlbumId={selectedAlbum?.id}
                  onAlbumClick={handleAlbumClick}
                  onViewClick={handleRoute}
                />
              </>
            ) : (
              <Grid container spacing={2}>
                <AlbumCardGrid
                  albums={filteredCollections}
                  selectedAlbumId={selectedAlbum?.id}
                  onAlbumClick={handleAlbumClick}
                  onViewClick={handleRoute}
                />
              </Grid>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {selectedAlbum && (
              <AlbumPreview
                title={selectedAlbum.title}
                previewPhotos={selectedAlbum.preview_photos || []}
                onImageClick={handleImageClick}
              />
            )}
          </Grid>
        </Grid>
      )}

      <ImagePreviewModal
        open={openModal}
        imageUrl={selectedImage}
        onClose={handleClose}
      />
      {filteredCollections?.length > 0 && (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          marginTop={"10px"}
          gap={5}
        >

          <ButtonWidget
          onClick={handlePreviousPage}
          disabled={page === 1}

          label="Previous"
          className="rounded-xl w-60"
          />
          <Typography variant="body1">Page: {page}</Typography>

          <ButtonWidget
         onClick={handleNextPage}
         label="Next"
          className="rounded-xl w-60"
          />
        </Stack>
      )}
    </Stack>
  );
};

export default TableView;
