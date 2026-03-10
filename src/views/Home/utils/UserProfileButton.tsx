import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export const UserProfileButton = () => {

    return(
        <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar size="lg" >
                <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"/>
                <AvatarFallback>usr</AvatarFallback>
            </Avatar>
        </Button>
    )
}