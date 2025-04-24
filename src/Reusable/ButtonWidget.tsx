import { Button, Box, CircularProgress } from "@mui/material";

interface LoadMoreButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  label?: string;
  className?: string;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const ButtonWidget: React.FC<LoadMoreButtonProps> = ({
  onClick,
  isLoading = false,
  label,
  endIcon,
  className,
  type,
  disabled = false,
}) => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Button
        variant="contained"
        onClick={onClick}
        disabled={isLoading || disabled}
        className={className}
        type={type || "button"}
        endIcon={endIcon}
      >
        {isLoading ? <CircularProgress/> : label}
      </Button>
    </Box>
  );
};

export default ButtonWidget;
