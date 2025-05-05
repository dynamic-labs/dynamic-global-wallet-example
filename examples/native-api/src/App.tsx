import { useEffect } from "react";
import { useRerender } from "./hooks/useRerender";
import DynamicGlobalWallet, {
  connect,
  disconnect,
  isEthereumWallet,
  onEvent,
} from "dynamic-global-wallet";
import { WalletCard } from "./components/WalletCard";
import { ViemTestPanel } from "./components/ViemTestPanel";
import { EthersTestPanel } from "./components/EthersTestPanel";

const App = () => {
  const rerender = useRerender();

  useEffect(
    () =>
      onEvent(DynamicGlobalWallet, "connect", () =>
        console.debug("global wallet connected")
      ),
    []
  );

  useEffect(
    () =>
      onEvent(DynamicGlobalWallet, "disconnect", () =>
        console.debug("global wallet disconnected")
      ),
    []
  );

  if (DynamicGlobalWallet.wallets.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold">Global Wallet Demo</h1>
          <p className="text-gray-600">
            Connect your wallet to test various blockchain interactions and
            features.
          </p>
          <button
            onClick={() => connect(DynamicGlobalWallet).then(rerender)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-8 p-8">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Global Wallet Demo</h1>
          <p className="text-gray-600">
            Test various blockchain interactions and features with your
            connected wallet.
          </p>

          <button
            onClick={() => {
              disconnect(DynamicGlobalWallet);
              rerender();
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Disconnect Wallet
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {DynamicGlobalWallet.wallets.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet}>
              {isEthereumWallet(wallet) && (
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">Viem</h3>
                    <ViemTestPanel wallet={wallet} />
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">Ethers</h3>
                    <EthersTestPanel wallet={wallet} />
                  </div>
                </div>
              )}
            </WalletCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
