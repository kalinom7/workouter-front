import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export const NotificationButton = () => {
    return(
        <Button variant="outline" size="icon" className="rounded-full">
            <Avatar size="default">
                <AvatarImage src="https://cdn-icons-png.flaticon.com/512/3119/3119338.png"/>
                <AvatarFallback>ic</AvatarFallback>
            </Avatar>
        </Button>
    )
}