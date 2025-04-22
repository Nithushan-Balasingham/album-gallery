import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { createAlbum } from "./albumThunks";

const AddAlbumForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await dispatch(createAlbum(title, description, false) as any);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to create album");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>Add New Album</Typography>
      <TextField
        label="Album Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={3}
        margin="normal"
      />
      <Button variant="contained" type="submit">Create Album</Button>
    </Box>
  );
};

export default AddAlbumForm;
