import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";

import "dynamic-global-wallet/ethereum";
import "dynamic-global-wallet/solana";

function App() {
  return (
    <DynamicContextProvider
      theme="auto"
      settings={{
        environmentId: "2762a57b-faa4-41ce-9f16-abff9300e2c9",
        walletConnectors: [EthereumWalletConnectors, SolanaWalletConnectors],
      }}
    >
      <DynamicWidget />
    </DynamicContextProvider>
  );
}

export default App;
