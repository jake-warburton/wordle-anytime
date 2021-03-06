import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme.js";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme} portalZIndex={99}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
