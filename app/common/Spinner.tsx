import { RefreshCcwIcon } from "lucide-react";

export default function Spinner({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="text-muted-foreground">
      <RefreshCcwIcon className="animate-spin h-4 w-4 mx-auto" />
      <span className="text-sm block text-center mt-4">{message}</span>
    </div>
  );
}
