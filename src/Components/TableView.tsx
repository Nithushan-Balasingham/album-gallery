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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchBar from "./Searchbar";
import { useEffect, useState } from "react";
import { useSearchPhotos } from "../hooks/useSearchPhotos";

const TableView = () => {
  const [search, setSearch] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [viewMode, setViewMode] = useState<"table" | "folder">("table");

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
    <Stack direction={"column"}  alignItems={"center"} className=" p-4 ">
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
      <Grid container spacing={4} style={{ marginTop: "12px" }}>
        <Grid size={{ xs: 12, md: selectedAlbum ? 6 : 12 }}>
          {viewMode === "table" ? (
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
                      hover
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedAlbum?.id === album.id
                            ? "#e0f7fa"
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
          ) : (
            <Grid container spacing={2}>
              {filteredCollections?.map((album: any) => (
                <Grid size={{ xs: 4, sm: 6, md: 4 }} key={album.id}>
                  <Box
                    onClick={() => handleAlbumClick(album)}
                    sx={{
                      cursor: "pointer",
                      p: 2,
                      height: "100%",
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      backgroundColor:
                        selectedAlbum?.id === album.id ? "#e0f7fa" : "white",
                      boxShadow: 1,
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: 3,
                      },
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      {album.title}
                    </Typography>
                    <Typography variant="body2">
                      {album.description || "No description"}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {selectedAlbum && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Preview Photos: {selectedAlbum.title}
              </Typography>
              <Grid container spacing={2}>
                {selectedAlbum.preview_photos?.map((photo: any) => (
                  <Grid size={{ xs: 6, sm: 6, lg:4 }} key={photo.id}>
                    <img
                      src={photo.urls.thumb}
                      alt={photo.slug}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
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

      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        marginTop={"10px"}
        gap={5}
      >
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
    </Stack>
  );
};

export default TableView;
