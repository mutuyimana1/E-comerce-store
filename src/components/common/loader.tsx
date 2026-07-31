import { Loader2 } from "lucide-react";

export default function Loader({ message = "Loading...", fullScreen = false }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-white ${fullScreen ? "min-h-[50vh]" : "py-12"}`}>
      <Loader2 className="w-5 h-5 text-zinc-800 animate-spin mb-2" />
      <p className="text-xs text-zinc-500">{message}</p>
    </div>
  );
}
