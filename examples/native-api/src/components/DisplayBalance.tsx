import { FC, useEffect, useState } from "react";

export const DisplayBalance: FC<{
  currency: string;
  fetcher: () => Promise<string>;
}> = ({ currency, fetcher }) => {
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    fetcher().then(setBalance);
  }, [fetcher]);

  return (
    <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-200">
      <strong>Balance</strong> {balance} {currency}
    </div>
  );
};
