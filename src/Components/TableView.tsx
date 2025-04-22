import {
  Grid,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Button,
  Stack,
} from "@mui/material";
import SearchBar from "./Searchbar";
import { useEffect, useState } from "react";
import { useSearchPhotos } from "../hooks/useSearchPhotos";

const TableView = () => {
  const [search, setSearch] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  const {
    data: collections,
    isLoading,
    error,
  } = useSearchPhotos(search, page, perPage);

  const filteredCollections = collections?.filter((album: any) =>
    album.title.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className="flex  flex-col items-center justify-center ">
      <SearchBar search={search} setSearch={setSearch} />
      <Grid container spacing={4} style={{ marginTop: "12px" }}>
        <Grid size={{ xs: 12, md: selectedAlbum ? 6 : 12 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Album</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCollections?.map((album: any) => (
                  <TableRow
                    key={album.id}
                    onClick={() => handleAlbumClick(album)}
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedAlbum?.id === album.id
                          ? "primary.light"
                          : "inherit",
                    }}
                  >
                    <TableCell>{album.title}</TableCell>
                    <TableCell>
                      {album.description || "No description available"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {selectedAlbum && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Preview Photos: {selectedAlbum.title}
              </Typography>
              <Grid container spacing={2}>
                {selectedAlbum.preview_photos?.map((photo: any) => (
                  <Grid size={{ xs: 6, sm: 4 }} key={photo.id}>
                    <img
                      src={photo.urls.thumb}
                      alt={photo.slug}
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>

      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} marginTop={"10px"} gap={5}>
        <Button
          onClick={handlePreviousPage}
          disabled={page === 1}
          variant="outlined"
        >
          Previous
        </Button>{" "}
        <Typography variant="body1">Page: {page}</Typography>
        <Button
          onClick={handleNextPage}
          variant="outlined"
          style={{ marginLeft: "10px" }}
        >
          Next
        </Button>
      </Stack>
    </div>
  );
};

export default TableView;
