import { useMutation } from "@tanstack/react-query";
import { addImageToAlbum } from "./useCreateCollection";

export const useAddImageToAlbum = () => {
  return useMutation({
    mutationFn: (data: { albumId: string; photoId: string }) =>
      addImageToAlbum(data.albumId, data.photoId),
    onSuccess: (data) => {
      console.log("Image added successfully", data);
    },
    onError: (error) => {
      console.error("Error adding image", error);
    },
  });
};
