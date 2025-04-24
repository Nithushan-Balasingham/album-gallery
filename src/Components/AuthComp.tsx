import { useDispatch } from "react-redux";
import { exchangeCodeForToken } from "../hooks/useUser";
import { setAccessToken } from "../store/slices/authSlice";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonWidget from "../Reusable/ButtonWidget";

export const AuthComp = () => {
  const dispatch = useDispatch();

  const schema = z.object({
    code: z.string().min(1, "Code is required"),
  });
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (formData: FormData) => {
    try {
      const data = await exchangeCodeForToken(formData.code);
      dispatch(setAccessToken(data.access_token));
      toast.success("Authenticated!", { autoClose: 2000 });
      reset();
    } catch (error) {
      console.error(error);
      toast.warn("Auth failed.");
    }
  };

  return (
    <Box
      margin={2}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ m: 4 }}
    >
      <Typography textAlign={"center"} variant="body1">
        Use this option if your access token has expired. <br />
        You can retrieve a new authorization code from your Unsplash Developer
        account.
      </Typography>{" "}
      <Stack direction={"column"} margin={2} spacing={2}>
        <TextField
          type="text"
          placeholder="Paste code here"
          className="border p-2 mr-2"
          fullWidth
          margin="normal"
          error={!!errors.code}
          helperText={errors.code?.message}
          {...register("code")}
        />
        <ButtonWidget
          type="submit"
          label="Authenticate"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded "
        />
      </Stack>
    </Box>
  );
};
