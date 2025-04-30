import { FC, useState } from "react";

export const SignMessageForm: FC<{
  onSubmit: (args: { message: string }) => Promise<{ signature: string }>;
}> = ({ onSubmit }) => {
  const [signature, setSignature] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      className="flex flex-col gap-2 p-2 bg-white rounded-lg border border-gray-200"
      onSubmit={async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.target as HTMLFormElement);
        const message = formData.get("message") as string;

        try {
          const { signature } = await onSubmit({ message });
          setSignature(signature);
        } catch (error) {
          console.error("Signing failed:", error);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="message">
          Sign Message
        </label>
        <input
          type="text"
          id="message"
          name="message"
          placeholder="Enter message to sign"
          defaultValue="Hello World"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing..." : "Sign Message"}
      </button>

      {signature && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-700">Signature</p>
          <p className="font-mono text-sm bg-gray-100 p-2 rounded">
            {signature}
          </p>
        </div>
      )}
    </form>
  );
};
