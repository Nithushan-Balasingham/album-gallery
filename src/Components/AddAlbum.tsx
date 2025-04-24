import React, { FC } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { AppDispatch } from "../store";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAlbum } from "./albumThunks";
import { CreateAlbumFormProps } from "../utils/types";

const schema = z.object({
  title: z.string().min(1, "Album title is required"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;


const AddAlbumForm: FC<CreateAlbumFormProps>= () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(createAlbum(data.title, data.description || "", false));
      toast.success("Album created successfully!");
      reset();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          toast.error(`Error creating album: ${error.response.data.message}`);
        } else {
          toast.error("Error creating album: " + error.message);
        }
      } else {
        toast.error("An unknown error occurred while creating the album.");
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ m: 4 }}>
      <Typography variant="h5">Add New Album</Typography>

      <TextField
        label="Album Title"
        fullWidth
        margin="normal"
        error={!!errors.title}
        helperText={errors.title?.message}
        {...register("title")}
      />

      <TextField
        label="Description"
        fullWidth
        multiline
        rows={3}
        margin="normal"
        {...register("description")}
      />

      <Button variant="contained" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Album"}
      </Button>
    </Box>
  );
};

export default AddAlbumForm;
