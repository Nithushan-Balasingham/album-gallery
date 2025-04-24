import { useMutation } from "@tanstack/react-query";
import { addImageToAlbum } from "./useCreateCollection";
import { useSelector } from "react-redux";
import { RootState } from "../store";


export const useAddImageToAlbum = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useMutation({
    mutationFn: (data: { albumId: string; photoId: string }) =>
      token ? addImageToAlbum(data.albumId, data.photoId, token) : Promise.reject(new Error("Token is null")),
    onSuccess: (data) => {
      console.log("Image added successfully", data);
    },
    onError: (error) => {
      console.error("Error adding image", error);
    },
  });
};
