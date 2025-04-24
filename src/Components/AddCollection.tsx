import  { FC } from "react";
import {  TextField, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { AppDispatch } from "../store";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAlbum } from "./albumThunks";
import { CreateAlbumFormProps } from "../utils/types";
import ButtonWidget from "../Reusable/ButtonWidget";

const schema = z.object({
  title: z.string().min(1, "Album title is required"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;


const AddCollection: FC<CreateAlbumFormProps>= () => {
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
      toast.success("Collection is  created successfully!");
      reset();
      setTimeout(()=>{
      window.location.reload()
      },2000)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if(error.response?.status=== 403){
          toast.error("Not Authorized or Rate limit exceeded for free account")
        }
        if (error.response?.data?.message) {
          console.log("object",error)
          toast.error(`Error creatisng album: ${error.response.data.message}`);
        } 
      } else {
        console.log(error)
        toast.error("An unknown error occurred while creating the album.");
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ m: 4 }}>
      <Typography variant="h5" textAlign={"center"}>Add New Collection</Typography>

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
      <ButtonWidget type="submit" label="Create Collection" disabled={isSubmitting}/>
    </Box>
  );
};

export default AddCollection;
