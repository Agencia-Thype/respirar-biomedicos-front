import { Container } from "@chakra-ui/react";
import { Routers } from "./routes";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [bodyHeight, setBodyHeight] = useState("100vh");

  useEffect(() => {
    const handleHeight = () => {
      if (document.documentElement.scrollHeight > window.innerHeight) {
        setBodyHeight("100%");
      } else {
        // setBodyHeight("100vh");
      }
    };

    handleHeight();
    window.addEventListener("resize", handleHeight);

    return () => {
      window.removeEventListener("resize", handleHeight);
    };
  }, []);
  return (
    <>
      <Container maxWidth={"8xl"} h={bodyHeight}>
        <Header />
      </Container>
      <Routers />
      <ToastContainer/>
    </>
  );
}

export default App;
