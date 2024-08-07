import { extendTheme } from "@chakra-ui/react";
import BG from "../assets/bg 1.png";

export const theme = extendTheme({
  colors: {
    "primary-color": "#3182CE",
    "input-background": "#EDF2F7",
    "second-color": "#CBAF86",
    "logo-color": "#116CA0",
    "title-color": "#EDE2CA",
    "black-color": "#E9F1F5",
    "button-background": "#3182CE",
  },
  fonts: {
    heading: `'Inter', cursive`,
    body: `'Inter', sans-serif`,
    button: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      color: "title-color",
      // body: {
      //   backgroundImage: BG,
      //   backgroundAttachment: "fixed",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "100% 100%",
      //   backgroundPosition: "center",
      // },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "#116CA0",
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
