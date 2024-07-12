import { extendTheme } from "@chakra-ui/react";
import BG from "../assets/bg 1.png";

export const theme = extendTheme({
  colors: {
    "primary-color": "#BFB6AC",
    "second-color": "#CBAF86",
    "logo-color": "#F6B51C",
    "title-color": "#EDE2CA",
    "black-color": "#251919",
  },
  fonts: {
    heading: `'Lobster', cursive`,
    body: `"roboto", sans-serif`,
    button: `"Lobster", sans-serif`,
  },
  styles: {
    global: {
      body: {
        backgroundImage: BG,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "title-color",
      },
      sizes: {
        xs: { fontSize: "0.875rem" }, // 14px
        sm: { fontSize: "1.125rem" }, // 18px
        md: { fontSize: "1.375rem" }, // 22px
        lg: { fontSize: "1.625rem" }, // 26px
        xl: { fontSize: "2rem" }, // 32px
        "2xl": { fontSize: "2.5rem" }, // 40px
        "3xl": { fontSize: "3rem" }, // 48px
        "4xl": { fontSize: "3.5rem" }, // 56px
      },
    },
    Button: {
      baseStyle: {
        fontFamily: "Inter, sans serif",
        textTransform: "uppercase",
        fontSize: "18px",
        lineHeight: "27px",
        letterSpacing: "0.09em",
        fontWeight: "bold",
      },
    },
  },
});
