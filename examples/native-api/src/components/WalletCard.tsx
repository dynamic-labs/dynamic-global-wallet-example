import { FC, PropsWithChildren } from "react";

import DynamicGlobalWallet, {
  getWalletNetwork,
  getSupportedEthereumNetworks,
  isEthereumWallet,
  signMessage,
  switchNetwork,
} from "dynamic-global-wallet";

import { useRerender } from "../hooks/useRerender";
import { SignMessageForm } from "./SignMessageForm";
import { buttonPrimary, buttonSecondary } from "../styles";

export const WalletCard: FC<
  PropsWithChildren<{ wallet: (typeof DynamicGlobalWallet)["wallets"][number] }>
> = ({ wallet, children }) => {
  const rerender = useRerender();

  return (
    <div className="bg-white rounded-lg p-6 flex flex-col gap-6 border border-gray-200">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">
          Wallet Information
        </h3>
        <div className="bg-gray-50 rounded-md p-4 flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600">Address</p>
            <p className="font-mono text-sm">{wallet.address}</p>
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600">Chain</p>
            <p>{isEthereumWallet(wallet) ? "Ethereum" : "Solana"}</p>
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600">Chain ID</p>
            <p>{getWalletNetwork(wallet)}</p>
          </div>
        </div>
      </div>

      {isEthereumWallet(wallet) && (
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Network Selection
          </h3>
          <div className="flex flex-row flex-wrap gap-2">
            {getSupportedEthereumNetworks(DynamicGlobalWallet).map(
              ({ chainId }) => (
                <button
                  key={chainId}
                  className={
                    chainId === getWalletNetwork(wallet)
                      ? buttonPrimary
                      : buttonSecondary
                  }
                  onClick={() => {
                    switchNetwork(wallet, { networkId: chainId });
                    rerender();
                  }}
                >
                  {chainId}
                </button>
              )
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">Sign Message</h3>
        <SignMessageForm
          onSubmit={async ({ message }) => signMessage(wallet, { message })}
        />
      </div>

      {children}
    </div>
  );
};
