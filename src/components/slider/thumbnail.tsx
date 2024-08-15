// thumbnail.tsx
import { Box } from "@chakra-ui/react";

interface ThumbnailProps {
  image: { src: string; label: string };
  isActive: boolean;
  color?: string;
}

export const Thumbnail = ({ image, isActive, color = "#3182CE" }: ThumbnailProps) => {
  return (
    <Box
      as="img"
      src={image.src}
      alt={image.label}
      border={isActive ? `2px solid ${color}` : "none"}
      width="50px"
      height="50px"
      cursor="pointer"
      transition="transform 0.3s ease-in-out, z-index 0.3s ease-in-out"
      transform={isActive ? "scale(4)" : "scale(2)"}
      zIndex={isActive ? 1 : 0}
      position="relative"
      margin="0 8px"
    />
  );
};
