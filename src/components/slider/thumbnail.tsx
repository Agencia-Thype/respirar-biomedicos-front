import { Box } from "@chakra-ui/react";

interface ThumbnailProps {
  image: { src: string; label: string };
  isActive: boolean;
  color?: string;
}

const Thumbnail = ({ image, isActive, color = "#3182CE" }: ThumbnailProps) => {
  return (
    <Box
      as="img"
      src={image.src}
      alt={image.label}
      border={isActive ? `2px solid ${color}` : "none"}
      width="90px"
      height="90px"
      cursor="pointer"
      transition="transform 0.3s ease-in-out, z-index 0.3s ease-in-out" // Transição suave para a escala e z-index
      transform={isActive ? "scale(2)" : "scale(1)"}
      zIndex={isActive ? 1 : 0} // Joga a imagem ativa para frente
      margin="0 5px" // Espaçamento padrão entre as imagens
      position="relative" // Necessário para que o z-index funcione corretamente
    />
  );
};

export default Thumbnail;
