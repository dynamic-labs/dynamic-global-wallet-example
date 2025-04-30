import { FC, useState } from "react";
import { buttonPrimary } from "../styles";

export const SendTransactionForm: FC<{
  defaultAmount: number;
  amountPlaceholder: string;
  currency: string;
  onSubmit: (args: {
    amount: number;
    to: string;
  }) => Promise<{ receipt: string }>;
}> = ({ defaultAmount, amountPlaceholder, currency, onSubmit }) => {
  const [receipt, setReceipt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      className="flex flex-col p-4 bg-white rounded-lg gap-4 border border-gray-200"
      onSubmit={async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.target as HTMLFormElement);
        const amount = Number(formData.get("amount"));
        const to = formData.get("to") as string;

        if (!to) {
          throw new Error("Recipient address is required");
        }

        if (!amount) {
          throw new Error("Amount is required");
        }

        try {
          const { receipt: txReceipt } = await onSubmit({ amount, to });
          setReceipt(txReceipt);
        } catch (error) {
          console.error("Transaction failed:", error);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <strong className="text-lg font-semibold">Send {currency} Balance</strong>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="amount">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder={amountPlaceholder}
          defaultValue={defaultAmount}
          step="0.000000000000000001"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="to">
          Recipient Address
        </label>
        <input
          type="text"
          id="to"
          name="to"
          placeholder="Enter recipient address"
          required
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button type="submit" disabled={isLoading} className={buttonPrimary}>
        {isLoading ? "Sending..." : `Send ${currency}`}
      </button>

      {receipt && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-700">
            Transaction Receipt
          </p>
          <p className="font-mono text-sm bg-gray-100 p-2 rounded">{receipt}</p>
        </div>
      )}
    </form>
  );
};
