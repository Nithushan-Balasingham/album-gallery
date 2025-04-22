import { z } from 'zod';

export const albumSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  private: z.boolean(),
  images: z.array(z.string().url()).min(1, "Select at least one image"),
});

export type AlbumFormData = z.infer<typeof albumSchema>;
