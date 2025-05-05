import { FC } from "react";

import { ethers } from "ethers";

import DynamicGlobalWallet from "dynamic-global-wallet";
import { createEIP1193Provider } from "dynamic-global-wallet/ethereum";

import { SignMessageForm } from "./SignMessageForm";
import { DisplayBalance } from "./DisplayBalance";
import { SendTransactionForm } from "./SendTransactionForm";

export const EthersTestPanel: FC<{
  wallet: (typeof DynamicGlobalWallet)["wallets"][number];
}> = ({ wallet }) => {
  const provider = createEIP1193Provider(DynamicGlobalWallet);
  const ethersProvider = new ethers.BrowserProvider(provider);

  return (
    <div className="flex flex-col gap-4">
      <DisplayBalance
        currency="ETH"
        fetcher={async () => {
          const balance = await ethersProvider.getBalance(wallet.address);

          return ethers.formatEther(balance);
        }}
      />

      <SignMessageForm
        onSubmit={async ({ message }) => {
          const signer = await ethersProvider.getSigner();
          const signature = await signer.signMessage(message);
          return { signature };
        }}
      />

      <SendTransactionForm
        defaultAmount={0.001}
        amountPlaceholder="0.001"
        currency="ETH"
        onSubmit={async ({ amount, to }) => {
          const signer = await ethersProvider.getSigner();

          const tx = await signer.sendTransaction({
            to,
            value: ethers.parseEther(amount.toString()),
          });

          return { receipt: tx.hash };
        }}
      />
    </div>
  );
};
