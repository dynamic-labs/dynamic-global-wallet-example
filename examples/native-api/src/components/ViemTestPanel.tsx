import { FC, useMemo } from "react";

import * as viemChains from "viem/chains";
import {
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
  Hex,
  http,
  parseEther,
} from "viem";

import { createEIP1193Provider } from "dynamic-global-wallet/ethereum";
import DynamicGlobalWallet, { getWalletNetwork } from "dynamic-global-wallet";

import { DisplayBalance } from "./DisplayBalance";
import { SignMessageForm } from "./SignMessageForm";
import { SendTransactionForm } from "./SendTransactionForm";

export const ViemTestPanel: FC<{
  wallet: (typeof DynamicGlobalWallet)["wallets"][number];
}> = ({ wallet }) => {
  const provider = createEIP1193Provider(DynamicGlobalWallet);

  const chain: viemChains.Chain | undefined = useMemo(
    () =>
      Object.values(viemChains).find(
        (chain) => chain.id === getWalletNetwork(wallet)
      ),
    [wallet]
  );

  const transport = custom(provider);

  const walletClient = createWalletClient({
    account: wallet.address as Hex,
    chain,
    transport,
  });

  return (
    <div className="flex flex-col gap-4">
      <DisplayBalance
        currency="ETH"
        fetcher={() =>
          createPublicClient({
            chain,
            transport: http(),
          })
            .getBalance({
              address: wallet.address as Hex,
            })
            .then((balance) => formatEther(balance))
        }
      />

      <SignMessageForm
        onSubmit={async ({ message }) => ({
          signature: await walletClient.signMessage({ message }),
        })}
      />

      <SendTransactionForm
        defaultAmount={0.001}
        amountPlaceholder="ETH"
        currency="ETH"
        onSubmit={async ({ amount, to }) => {
          const receipt = await walletClient.sendTransaction({
            chain,
            to: to as Hex,
            value: parseEther(amount.toString()),
          });

          return { receipt };
        }}
      />
    </div>
  );
};
