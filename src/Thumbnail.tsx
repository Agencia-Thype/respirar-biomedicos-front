import React from 'react';
import { Box, Image } from "@chakra-ui/react";

interface ThumbnailProps {
  src: string;
  isActive: boolean;
  
}



const Thumbnail: React.FC<ThumbnailProps> = ({ src, isActive }) => {
  return (
    <Box className="item" width="150px" height="220px" flexShrink="0" position="relative" opacity={isActive ? 1 : 0.5}>
      <Image src={src} width="100%" height="100%" objectFit="cover" borderRadius="20px" />
    </Box>
  );
};

export default Thumbnail;
