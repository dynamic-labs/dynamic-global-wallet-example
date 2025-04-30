import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PrivyProvider } from "@privy-io/react-auth";

import "dynamic-global-wallet/ethereum";
import "dynamic-global-wallet/solana";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivyProvider
      appId="cm6jx9s3u00118uzz390fn4z2"
      config={{
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "https://your-logo-url",
        },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>
);
