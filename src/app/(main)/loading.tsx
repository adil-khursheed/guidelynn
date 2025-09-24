import { Loader2Icon } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="min-h-dvh w-full flex items-center justify-center">
      <Loader2Icon className="animate-spin text-primary" />
    </div>
  );
};

export default loading;
