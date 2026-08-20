import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const GoBackArrow = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className="rounded-full justify-start"
      onClick={handleGoBack}
      asChild
    >
      <ArrowLeftIcon className="size-1 text-[#00FFFB]" />
    </Button>
  );
};
