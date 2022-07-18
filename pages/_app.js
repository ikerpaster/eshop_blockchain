import "../styles/globals.css";

import { MoralisProvider } from "react-moralis";
import { AmazonProvider } from "../context/AmazonContext";
import { ModalProvider } from "react-simple-hook-modal";
import { BrowserRouter } from "react-router-dom";
function MyApp({ Component, pageProps }) {
  return (
    // <BrowserRouter>
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER}
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
    >
      <AmazonProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </AmazonProvider>
    </MoralisProvider>
    // </BrowserRouter>
  );
}

export default MyApp;
