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
  const { data: collections, isLoading, error } = useSearchPhotos(search);
  const { data: photos, isLoading: isPhotosLoading } = useSearchPhotos(
    selectedAlbum?.id || ""
  );
  console.log("COO", collections);
  const handleViewChange = (view: "albums" | "grid" | "slideshow") => {
    setViewType(view);
  };

  const handleAlbumClick = (album: any) => {
    setSelectedAlbum(album);
    setViewType("grid");
  };
  useEffect(() => {}, [viewType]);
  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />

      {/* Dropdown to switch between views */}
      <div>
        <button onClick={() => handleViewChange("albums")}>Albums</button>
        <button onClick={() => handleViewChange("grid")}>Grid View</button>
      </div>

      {viewType === "albums" && (
        <div style={{ marginTop: "20px" }}>
          <h2>Albums</h2>
          <table>
            <thead>
              <tr>
                <th>Album</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {collections?.map((album: any) => (
                <tr key={album.id} onClick={() => handleAlbumClick(album)}>
                  <td>{album.title}</td>
                  <td>{album.description || "No description available"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                  size={{ xs: 12, sm:12, md: 6, lg: 4 }}
                  key={item.id}
                  padding={4}
                >
                  <Card onClick={() => handleViewChange("slideshow")} sx={{height:'100%'}}>
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
