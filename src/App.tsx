/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Grid,
  Stack,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Box,
} from "@mui/material";
import { useSearchPhotos } from "./hooks/useSearchPhotos";
import SearchBar from "./Components/Searchbar";
import Slideshow from "./Components/Slideshow";

function App() {
  const [search, setSearch] = useState("");
  const [viewType, setViewType] = useState<"albums" | "grid" | "slideshow">(
    "albums"
  );
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [selectedAlbum_id, setAlbum_id] = useState<any>("");
  const { data: collections, isLoading, error } = useSearchPhotos(search);
  const { data: photos, isLoading: isPhotosLoading } = useSearchPhotos(
    selectedAlbum?.id || ""
  );
  console.log("COO", collections);
  const handleViewChange = (view: "albums" | "grid" | "slideshow") => {
    setViewType(view);
  };
console.log("object", selectedAlbum_id)
  const handleAlbumClick = (album: any) => {
    setAlbum_id(album.id);
    setSelectedAlbum(album);
  };
  useEffect(() => {}, [viewType]);
  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />
      <div>
        <button onClick={() => handleViewChange("albums")}>Albums</button>
        <button onClick={() => handleViewChange("grid")}>Grid View</button>
      </div>

      {viewType === "albums" && (
  <Grid container spacing={4} style={{ marginTop: "20px" }}>
    <Grid  size={{xs:4 , md:6}}>
      <Typography variant="h5" gutterBottom>Albums</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Album</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collections?.map((album: any) => (
              <TableRow key={album.id} onClick={() => handleAlbumClick(album)} hover style={{ cursor: "pointer" }}>
                <TableCell>{album.title}</TableCell>
                <TableCell>{album.description || "No description available"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>

    <Grid  size={{xs:12 , md:6}}>
      {selectedAlbum && (
        <Box>
          <Typography variant="h6" gutterBottom>Preview Photos</Typography>
          <Grid container spacing={2}>
            {selectedAlbum.preview_photos?.map((photo: any) => (
              <Grid  size={{sm:4 , xs:6}} key={photo.id}>
                <img
                  src={photo.urls.thumb}
                  alt={photo.slug}
                  style={{ width: "100%", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Grid>
  </Grid>
)}


      {viewType === "grid" && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h3" paddingLeft={4}>
            Grid View
          </Typography>
          <Grid container spacing={3}>
            {isPhotosLoading ? (
              <Grid>
                <CircularProgress />
              </Grid>
            ) : (
              collections?.map((item: any) => (
                <Grid
                  size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
                  key={item.id}
                  padding={4}
                >
                  <Card
                    onClick={() => handleViewChange("slideshow")}
                    sx={{ height: "100%" }}
                  >
                    <CardMedia
                      component="img"
                      alt={item.alt_description || "Image"}
                      height="500"
                      image={
                        item.preview_photos
                          ? item.preview_photos[0]?.urls.regular
                          : item.urls?.regular
                      }
                    />
                    <CardContent>
                      <Typography
                        variant="h5"
                        color="textSecondary"
                        align="center"
                      >
                        Title: {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        align="center"
                      >
                        Description: {item.description || "N/A"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </div>
      )}

      {viewType === "slideshow" && (
        <div style={{ marginTop: "20px" }}>
          <h2>Slideshow</h2>
          <Slideshow photos={photos || []} />
        </div>
      )}
    </div>
  );
}

export default App;
