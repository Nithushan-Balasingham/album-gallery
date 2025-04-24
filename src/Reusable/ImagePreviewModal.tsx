import { Dialog, DialogContent } from "@mui/material";
import { ImagePreviewModalProps } from "../utils/types";


const ImagePreviewModal = ({ open, imageUrl, onClose }: ImagePreviewModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent
        sx={{
          padding: 0,
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewModal;
