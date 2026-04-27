import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const HelpButton = () => {
  return (
    <Button variant="outline" size="icon" className="rounded-full">
      <Avatar size="default">
        <AvatarImage src="https://icons.veryicon.com/png/o/miscellaneous/flat-icon/help-252.png" />
        <AvatarFallback>hp</AvatarFallback>
      </Avatar>
    </Button>
  );
};
